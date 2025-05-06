import { College } from '@/lib/types';
import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';

interface Props {
  colleges: College[];
  loading: boolean;
  onSelect(college?: College): void;
  selected?: College;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

const SelectCollege: FC<Props> = ({
  colleges,
  loading,
  onSelect,
  selected,
  label,
  helperText,
  placeholder,
}) => {
  return (
    <SelectField
      loading={loading}
      className="w-full"
      placeholder={placeholder}
      label={label}
      helperText={helperText}
      data={colleges?.map((college) => ({
        label: (
          <ListTile title={college?.name + ' ' + `(${college?.acronym})`} />
        ),
        value: college,
        id: college._id,
      }))}
      value={selected?.name}
      onSelect={(option) => {
        onSelect(option.value);
      }}
      onClear={() => {
        onSelect(undefined);
      }}
      onSearch={(search) => {
        if (!search) {
          return colleges?.map((college) => ({
            label: (
              <ListTile title={college?.name + ' ' + `(${college?.acronym})`} />
            ),
            value: college,
            id: college._id,
          }));
        }

        if (colleges) {
          return colleges
            .filter(
              (college) =>
                college.name.toLowerCase().includes(search?.toLowerCase()!) ||
                college.acronym.toLowerCase().includes(search?.toLowerCase()!)
            )
            .map((college) => {
              return {
                label: (
                  <ListTile
                    title={college?.name + ' ' + `(${college?.acronym})`}
                  />
                ),
                value: college,
                id: college._id,
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectCollege;
