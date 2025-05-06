'use client';
import ImageUploader from '@/components/common/inputs/image-upload';
import RadioField from '@/components/common/inputs/radio-field';
import SelectField from '@/components/common/inputs/select-field';
import TextField from '@/components/common/inputs/text-field';
import { getColleges, getDepartments } from '@/lib/services/admin/academics.service';
import { uploadDocument } from '@/lib/services/admin/document.service';
import { College, Department, UploadDocument } from '@/lib/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
	const [department, setDepartment] = useState<Department>();
	const [selectedLevel, setSelectedLevel] = useState<string>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		watch,
	} = useForm<Inputs>();
	const file = watch('file');

	const { data: colleges, isLoading: isCollegesLoading } = useQuery({
		queryKey: ['colleges'],
		queryFn: async () => {
			const data = await getColleges();
			return data;
		},
	});

	const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
		queryKey: ['departments', college?._id],
		queryFn: async () => {
			if (!college?._id) return [];
			const data = await getDepartments(college._id);
			return data;
		},
		enabled: Boolean(college?._id),
	});

	const { mutateAsync: _upload, isPending: isUploading } = useMutation({
		mutationKey: ['document-upload'],
		mutationFn: uploadDocument,
		onSuccess() {
			toast.success('Document upload successful!');
			router.push('/admin/documents');
		},
	});

	useEffect(() => {
		if (college) {
			setDepartment(undefined);
			setSelectedLevel(undefined);
			setValue('department', '');
			setValue('level', null as any);
			setValue('semester_index', null as any);
		}
	}, [college, setValue]);

	const submit: SubmitHandler<Inputs> = async (data) => {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('document_type', data.document_type);
		formData.append('level', data.level?.toString() ?? '');
		formData.append('department', data.department);
		formData.append('semester_index', data.semester_index?.toString() ?? '');

		if (data.file) {
			formData.append('file', data.file);
		} else {
			toast.error('Please upload a document file');
			return;
		}

		await _upload(formData);
	};

	return (
		<section className="flex flex-col space-y-4 mt-6">
			<h1 className="text-2xl font-bold">Upload New Document</h1>
			<p className="text-gray-400 text-sm">
				Fill in the document details below to upload a new document to the system.
			</p>
			<form onSubmit={handleSubmit(submit)} className="w-full">
				<div className="flex flex-col justify-center gap-8 rounded-xl border border-gray-300 p-6">
					<TextField
						label="Document Name"
						InputProps={{
							required: true,
							placeholder: 'Enter document name',
							...register('name', {
								required: 'Document name is required',
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
						<SelectField
							data={{
								label: college?.name || '',
								value: college?._id || '',
							}}
							onValueChange={(value) => {
								const selectedCollege = colleges?.find((c) => c._id === value);
								if (selectedCollege) setCollege(selectedCollege);
							}}
							options={
								colleges?.map((p) => ({
									label: p.name,
									value: p._id,
								})) || []
							}
							label="Select College"
							placeholder="Choose a college"
							loading={isCollegesLoading}
							containerProps={{ className: 'w-full bg-transparent' }}
						/>

						<SelectField
							data={{
								label: department?.name || '',
								value: department?._id || '',
							}}
							onValueChange={(value) => {
								const selectedDepartment = departments?.find((d) => d._id === value);
								if (selectedDepartment) {
									setDepartment(selectedDepartment);
									setValue('department', value);
								}
							}}
							options={
								departments?.map((p) => ({
									label: p.name,
									value: p._id,
								})) || []
							}
							label="Select Department"
							placeholder="Choose a department"
							loading={isDepartmentsLoading}
							containerProps={{ className: 'w-full' }}
						/>

						<SelectField
							data={{
								label: selectedLevel ? `${selectedLevel} Level` : '',
								value: selectedLevel || '',
							}}
							onValueChange={(value) => {
								setSelectedLevel(value);
								setValue('level', parseInt(value));
							}}
							options={Array.from({ length: department?.level_count || 0 }, (_, index) => ({
								label: `${(index + 1) * 100} Level`,
								value: ((index + 1) * 100).toString(),
							}))}
							label="Select Level"
							placeholder="Choose a level"
							containerProps={{ className: 'w-full' }}
						/>

						<SelectField
							data={{
								label: '',
								value: '',
							}}
							onValueChange={(value) => {
								setValue('semester_index', value === '1st Semester' ? 1 : 2);
							}}
							options={[
								{ label: '1st Semester', value: '1st Semester' },
								{ label: '2nd Semester', value: '2nd Semester' },
							]}
							label="Select Semester"
							placeholder="Choose a semester"
							containerProps={{ className: 'w-full' }}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor={'file'} className={`sm:text-[.85rem] text-[0.7rem]  flex items-center`}>
							Upload Document
							<span className="text-red-600 pb-[.1rem] ml-1 text-[1.2rem]">*</span>
						</label>
						{!file ? (
							<ImageUploader
								id="file"
								uploaded_image={undefined}
								onUploadImage={(file) => {
									setValue('file', file);
								}}
							/>
						) : (
							<ImageUploader
								uploaded_image={file}
								onRemoveImage={() => {
									setValue('file', undefined);
								}}
							/>
						)}
					</div>
					<div className="flex justify-end items-end gap-8">
						<button
							type="reset"
							onClick={() => {
								reset({});
							}}
							className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed">
							Cancel
						</button>
						<button
							type="submit"
							className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={isCollegesLoading || isDepartmentsLoading}>
							{isUploading ? 'Uploading...' : 'Upload'}
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default UploadDocumentPage;
