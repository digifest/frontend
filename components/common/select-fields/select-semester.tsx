import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';

interface Props {
	data: (1 | 2)[];
	loading: boolean;
	onSelect(level?: 1 | 2): void;
	selected?: 1 | 2;
	label?: string;
	helperText?: string;
	placeholder?: string;
}

const SelectSemester: FC<Props> = ({
	data,
	loading,
	onSelect,
	selected,
	label,
	helperText,
	placeholder,
}) => {
	const formatName = (sm: 1 | 2) => (sm == 1 ? '1st Semester' : '2nd Semester');

	return (
		<SelectField
			loading={loading}
			className="w-full"
			placeholder={placeholder}
			label={label}
			helperText={helperText}
			data={data?.map((semester) => ({
				label: <ListTile title={formatName(semester)} />,
				value: semester,
				id: formatName(semester),
			}))}
			value={selected ? formatName(selected) : (null as any)}
			onSelect={(option) => {
				onSelect(option.value);
			}}
			onClear={() => {
				onSelect(null as any);
			}}
			onSearch={(search) => {
				if (!search) {
					return data?.map((semester) => ({
						label: <ListTile title={formatName(semester)} />,
						value: formatName(semester),
						id: formatName(semester),
					}));
				}

				if (data) {
					return data
						.filter((semester) => search && formatName(semester).toLowerCase().includes(search.toLowerCase()))
						.map((semester) => {
							return {
								label: <ListTile title={formatName(semester)} />,
								value: formatName(semester),
								id: formatName(semester),
							};
						});
				}
				return [];
			}}
		/>
	);
};

export default SelectSemester;
