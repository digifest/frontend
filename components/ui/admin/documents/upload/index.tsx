'use client';

import ImageUploader from '@/components/common/inputs/image-upload';
import RadioField from '@/components/common/inputs/radio-field';
import TextField from '@/components/common/inputs/text-field';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectCourse from '@/components/common/select-fields/select-course-code';
import SelectDepartment from '@/components/common/select-fields/select-department';
import {
	getColleges,
	getCourses,
	getDepartmentsForCollege,
} from '@/lib/services/admin/academics.service';
import { uploadDocument } from '@/lib/services/admin/document.service';
import { College, Course, Department, UploadDocument } from '@/lib/types';
import { toastError } from '@/lib/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AddCourseModal from './add-course';

type Inputs = Omit<UploadDocument, 'file'> & {
	file: File | undefined;
};

const options = [
	{ label: 'Lecture Note', value: 'lecture_note' },
	{ label: 'Past Question', value: 'past_question' },
];

const UploadDocumentPage = () => {
	const router = useRouter();
	const [college, setCollege] = useState<College>();
	const [selectedDepartment, setSelectedDepartment] = useState<Department>();
	const [selectedCourse, setSelectedCourse] = useState<Course>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		watch,
		clearErrors,
	} = useForm<Inputs>();

	const [department, file] = watch(['department', 'file']);

	const { data: colleges, isLoading: collegesLoading } = useQuery({
		queryKey: ['colleges'],
		queryFn: () => getColleges(),
	});

	const { data: departments, isLoading: departmentsLoading } = useQuery({
		queryKey: ['colleges', college?._id, 'departments'],
		queryFn: () => {
			if (!college?._id) throw new Error('College ID is required');
			return getDepartmentsForCollege(college._id);
		},
		enabled: !!college?._id,
	});

	const { data: courses, isLoading: coursesLoading } = useQuery({
		queryKey: ['departments', selectedDepartment?._id, 'courses'],
		queryFn: () => {
			if (!selectedDepartment?._id) throw new Error('Department ID is required');
			return getCourses(selectedDepartment._id);
		},
		enabled: !!selectedDepartment?._id,
	});

	const { mutateAsync: _upload, isPending: isUploading } = useMutation({
		mutationKey: ['document-upload'],
		mutationFn: uploadDocument,
		onSuccess() {
			toast.success('Document upload successful!');
			router.push('/admin/documents');
		},
		onError(error) {
			toast.error(error instanceof Error ? error.message : 'Failed to upload document');
		},
	});

	useEffect(() => {
		if (college) {
			setSelectedDepartment(undefined);
			setSelectedCourse(undefined);
			setValue('department', '');
			setValue('course', '');
		}
	}, [college, setValue]);

	const resetForm = () => {
		reset({
			name: '',
			description: '',
			document_type: undefined,
			department: '',
			file: undefined,
			course: '',
		});

		setCollege(undefined);
		setSelectedDepartment(undefined);
		setSelectedCourse(undefined);
	};

	const submit: SubmitHandler<Inputs> = async (data) => {
		try {
			const formData = new FormData();

			formData.append('name', data.name.trim());
			formData.append('description', data.description.trim());
			formData.append('document_type', data.document_type);
			formData.append('course', data.course);
			formData.append('department', data.department);

			if (!data.file) {
				toastError('Please upload a document file');
				return;
			}

			formData.append('file', data.file);
			await _upload(formData);
		} catch (error) {
			toastError('Failed to upload document');
		}
	};

	return (
		<section className="flex flex-col space-y-4 mt-6">
			{modalOpen && <AddCourseModal setModalOpen={setModalOpen} />}
			<h1 className="text-2xl font-bold">Upload New Document</h1>
			<p className="text-gray-400 text-sm">
				Fill in the document details below to upload a new document to the system.
			</p>
			<form onSubmit={handleSubmit(submit)} className="w-full">
				<div className="flex flex-col justify-center gap-8 rounded-xl border border-gray-300 p-3 md:p-6">
					<TextField
						label="Document Name"
						InputProps={{
							required: true,
							placeholder: 'Enter document name',
							...register('name', {
								required: 'Document name is required',
								minLength: {
									value: 3,
									message: 'Document name must be at least 3 characters',
								},
							}),
						}}
						helperText={errors?.name?.message}
					/>

					<TextField
						label="Document Description"
						InputProps={{
							required: true,
							placeholder: 'Enter document description',
							...register('description', {
								required: 'Document description is required',
								minLength: {
									value: 10,
									message: 'Description must be at least 10 characters',
								},
							}),
						}}
						helperText={errors?.description?.message}
					/>

					<RadioField
						label="Document Type"
						options={options}
						InputProps={{
							required: true,
							...register('document_type', {
								required: 'Document type is required',
							}),
						}}
						helperText={errors?.document_type?.message}
					/>

					<div className="border-t border-gray-300 pt-2" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<SelectCollege
							colleges={colleges ?? []}
							onSelect={(college) => {
								setCollege(college);
								setValue('department', '');
							}}
							selected={college}
							loading={collegesLoading}
							label="College"
							placeholder="Select college"
						/>

						<SelectDepartment
							data={!college ? [] : departments ?? []}
							onSelect={(department) => {
								if (department) {
									setSelectedDepartment(department);
									setValue('department', department._id);
									clearErrors('department');
								}
							}}
							selected={selectedDepartment}
							loading={collegesLoading || departmentsLoading}
							label="Departments"
							placeholder={!college ? 'Select college first' : 'Select department'}
							helperText={errors?.department?.message}
						/>

						<SelectCourse
							data={!college || !departments ? [] : courses ?? []}
							onSelect={(course) => {
								if (course) {
									setSelectedCourse(course);
									setValue('course', course._id);
									clearErrors('course');
								}
							}}
							selected={selectedCourse}
							loading={departmentsLoading || coursesLoading}
							label="Course"
							placeholder={!college ? 'Select department first' : 'Select course'}
							helperText={errors?.course?.message}
						/>

						<button
							type="button"
							onClick={() => setModalOpen(true)}
							className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={collegesLoading || departmentsLoading}>
							Add course
						</button>
					</div>

					<div className="flex flex-col">
						<label htmlFor="file" className="sm:text-[.85rem] text-[0.7rem] flex items-center">
							Upload Document
							<span className="text-red-600 pb-[.1rem] ml-1 text-[1.2rem]">*</span>
						</label>
						{!file ? (
							<ImageUploader
								id="file"
								uploaded_image={undefined}
								onUploadImage={(file) => setValue('file', file)}
							/>
						) : (
							<ImageUploader uploaded_image={file} onRemoveImage={() => setValue('file', undefined)} />
						)}
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
							disabled={collegesLoading || departmentsLoading || isUploading}>
							{isUploading ? 'Uploading...' : 'Upload'}
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default UploadDocumentPage;
