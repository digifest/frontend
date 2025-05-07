'use client';
import TextField from '@/components/common/inputs/text-field';
import Modal from '@/components/common/modal';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { AddCourseDto } from '@/lib/dtos/academic.dto';
import { addCourse, getDepartments } from '@/lib/services/admin/academics.service';
import { Department } from '@/lib/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectField from '@/components/common/inputs/select-field';
import { toastSuccess } from '@/lib/utils/toast';
import { queryClient } from '@/lib/providers/providers';

interface Props {
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCourseModal = ({ setModalOpen }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		clearErrors,
	} = useForm<AddCourseDto>();

	const [selectedDepartment, setSelectedDepartment] = useState<Department>();
	const [semester, setSemester] = useState<string>('');
	const [selectedLevel, setSelectedLevel] = useState<string>();

	const { data: departments, isLoading: departmentsLoading } = useQuery({
		queryKey: ['get-departments'],
		queryFn: () => getDepartments(),
	});

	const resetForm = () => {
		reset({
			name: '',
			department: '',
			course_code: '',
			level: undefined as any,
			semester_index: undefined as any,
		});

		setSelectedDepartment(undefined);
		setSelectedLevel(undefined);
		setSemester(undefined as any);
	};

	const { mutateAsync: _addCourse, isPending: addingCourse } = useMutation({
		mutationKey: ['add-course'],
		mutationFn: addCourse,
		onSuccess() {
			queryClient.invalidateQueries({
				predicate: ({ queryKey }) => queryKey.includes('courses'),
			});
			toastSuccess('Course added successfully!');
		},
	});

	const submit: SubmitHandler<AddCourseDto> = async (data) => {
		await _addCourse({
			name: data.name,
			course_code: data.course_code,
			department: data.department,
			level: data.level,
			semester_index: data.semester_index,
		});
		setModalOpen(false);
	};

	return (
		<Modal
			onClose={() => setModalOpen(false)}
			showCloseButton
			className="bg-white p-8 rounded-xl w-[60vw]">
			<form onSubmit={handleSubmit(submit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<TextField
						label="Course Name"
						InputProps={{
							required: true,
							placeholder: 'Enter course name',
							...register('name', {
								required: 'Course name is required',
								minLength: {
									value: 5,
									message: 'Course name must be at least 5 characters',
								},
							}),
						}}
						helperText={errors?.name?.message}
					/>
					<TextField
						label="Course Code"
						InputProps={{
							required: true,
							placeholder: 'Enter course code',
							...register('course_code', {
								required: 'Course code is required',
								minLength: {
									value: 6,
									message: 'Course code must be at least 6 characters',
								},
							}),
						}}
						helperText={errors?.course_code?.message}
					/>
					<SelectDepartment
						data={departments ?? []}
						onSelect={(department) => {
							if (department) {
								setSelectedDepartment(department);
								setValue('department', department._id);
								clearErrors('department');
							}
						}}
						selected={selectedDepartment}
						loading={departmentsLoading}
						label="Departments"
						placeholder={'Select department'}
						helperText={errors?.department?.message}
					/>
					<SelectField
						loading={departmentsLoading}
						className="w-full"
						placeholder={!selectedDepartment ? 'Select department first' : 'Choose a level'}
						label={'Select Level'}
						data={Array.from({ length: selectedDepartment?.level_count || 0 }, (_, index) => ({
							id: `${(index + 1) * 100} Level`,
							label: `${(index + 1) * 100} Level`,
							value: ((index + 1) * 100).toString(),
						}))}
						helperText={errors.level?.message}
						value={selectedLevel}
						onSelect={(option) => {
							setSelectedLevel(option.value);
							setValue('level', option.value);
						}}
						onClear={() => {
							setSelectedLevel(undefined);
							setValue('level', undefined as any);
						}}
						disabled={!selectedDepartment}
					/>

					<SelectField
						data={[
							{ id: '1', label: '1st Semester', value: '1st Semester' },
							{ id: '2', label: '2nd Semester', value: '2nd Semester' },
						]}
						onSelect={(option) => {
							setSemester(option.value);
							setValue('semester_index', option.value === '1st Semester' ? '1' : '2');
						}}
						onClear={() => {
							setSemester('');
							setValue('semester_index', undefined as any);
						}}
						value={semester}
						label="Select Semester"
						placeholder={!selectedLevel ? 'Select level first' : 'Choose a semester'}
						helperText={errors?.semester_index?.message}
						disabled={!selectedLevel}
						className="w-full"
					/>
				</div>
				<div className="flex justify-center md:justify-end md:items-end items-center gap-8">
					<button
						type="button"
						onClick={resetForm}
						className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed">
						Cancel
					</button>
					<button
						type="submit"
						className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={departmentsLoading || addingCourse}>
						{addingCourse ? 'Adding...' : 'Add Course'}
					</button>
				</div>
			</form>
		</Modal>
	);
};
export default AddCourseModal;
