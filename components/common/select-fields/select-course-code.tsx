import { Course } from '@/lib/types';
import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';

interface Props {
	data: Course[];
	loading: boolean;
	onSelect(course_code?: Course): void;
	selected?: Course;
	label?: string;
	helperText?: string;
	placeholder?: string;
}

const SelectCourse: FC<Props> = ({
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
			data={data?.map((course) => ({
				label: <ListTile title={course?.name + ' ' + `(${course?.course_code})`} />,
				value: course,
				id: course._id,
			}))}
			value={selected?.course_code}
			onSelect={(option) => {
				onSelect(option.value);
			}}
			onClear={() => {
				onSelect(undefined);
			}}
			onSearch={(search) => {
				if (!search) {
					return data?.map((course) => ({
						label: <ListTile title={course?.name + ' ' + `(${course?.course_code})`} />,
						value: course,
						id: course._id,
					}));
				}

				if (data) {
					return data
						.filter(
							(course) =>
								search &&
								(course.name.toLowerCase().includes(search.toLowerCase()) ||
									course.course_code.toLowerCase().includes(search.toLowerCase()))
						)
						.map((course) => {
							return {
								label: <ListTile title={course?.name + ' ' + `(${course?.course_code})`} />,
								value: course,
								id: course._id,
							};
						});
				}
				return [];
			}}
		/>
	);
};

export default SelectCourse;
