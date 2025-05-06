import { Department } from '@/lib/types';
import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';

interface Props {
  data: Department[];
  loading: boolean;
  onSelect(department?: Department): void;
  selected?: Department;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

const SelectDepartment: FC<Props> = ({
  data,
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
      data={data?.map((dept) => ({
        label: <ListTile title={dept?.name + ' ' + `(${dept?.acronym})`} />,
        value: dept,
        id: dept._id,
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
          return data?.map((dept) => ({
            label: <ListTile title={dept?.name + ' ' + `(${dept?.acronym})`} />,
            value: dept,
            id: dept._id,
          }));
        }

        if (data) {
          return data
            .filter(
              (dept) =>
                dept.name.toLowerCase().includes(search?.toLowerCase()!) ||
                dept.acronym.toLowerCase().includes(search?.toLowerCase()!)
            )
            .map((dept) => {
              return {
                label: (
                  <ListTile title={dept?.name + ' ' + `(${dept?.acronym})`} />
                ),
                value: dept,
                id: dept._id,
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectDepartment;
