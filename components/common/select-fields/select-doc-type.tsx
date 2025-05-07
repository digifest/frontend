import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';
import { DocType } from '@/lib/enums';

interface Props {
  data: DocType[];
  loading: boolean;
  onSelect(type?: DocType): void;
  selected?: DocType;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

const SelectDocType: FC<Props> = ({
  data,
  loading,
  onSelect,
  selected,
  label,
  helperText,
  placeholder,
}) => {
  const formatName = (type: DocType) =>
    type === DocType.past_question ? 'Past Question' : 'Lecture Note';

  return (
    <SelectField
      loading={loading}
      className="w-full"
      placeholder={placeholder}
      label={label}
      helperText={helperText}
      data={data?.map((docType) => ({
        label: <ListTile title={formatName(docType)} />,
        value: docType,
        id: docType.toString(),
      }))}
      value={selected ? `${formatName(selected)}` : ''}
      onSelect={(option) => {
        onSelect(option.value);
      }}
      onClear={() => {
        onSelect(undefined);
      }}
      onSearch={(search) => {
        if (!search) {
          return data?.map((docType) => ({
            label: <ListTile title={formatName(docType)} />,
            value: docType,
            id: docType.toString(),
          }));
        }

        if (data) {
          return data
            .filter(
              (docType) =>
                search &&
                formatName(docType).toLowerCase().includes(search.toLowerCase())
            )
            .map((docType) => {
              return {
                label: <ListTile title={formatName(docType)} />,
                value: docType,
                id: docType.toString(),
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectDocType;
