'use client';
import SelectField from '@/components/common/inputs/select-field';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { getDepartmentsForCollege } from '@/lib/services/academics.service';
import { getColleges } from '@/lib/services/admin/academics.service';
import { College, Department } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaDeleteLeft, FaPlus } from 'react-icons/fa6';

const DocumentPage = () => {
	const [documentType, setDocumentType] = useState<string>('');
	const [college, setCollege] = useState<College>();
	const [selectedDepartment, setSelectedDepartment] = useState<Department>();
	const [semester, setSemester] = useState<string>('');
	const [selectedLevel, setSelectedLevel] = useState<string>();

	const { data: colleges, isLoading: collegesLoading } = useQuery({
		queryKey: ['colleges'],
		queryFn: getColleges,
	});

	const { data: departments, isLoading: departmentsLoading } = useQuery({
		queryKey: ['colleges', college?._id, 'departments'],
		queryFn: () => {
			if (!college?._id) throw new Error('College ID is required');
			return getDepartmentsForCollege(college._id);
		},
		enabled: !!college?._id,
	});
	return (
	<section>
		<div className="flex flex-col md:flex-row justify-start items-start gap-8 mt-6">
			<div className="w-full grid grid-cols-2 md:grid-col-3 gap-8">
				<SelectField
					data={[
						{ id: 'Lecture Note', label: 'Lecture Note', value: 'Lecture Note' },
						{ id: 'Past Question', label: 'Past Question', value: 'Past Question' },
					]}
					onSelect={(option) => {
						setDocumentType(option.value);
					}}
					onClear={() => {
						setDocumentType(undefined as any);
					}}
					value={documentType}
					label="Select document type"
					placeholder={'Choose document type'}
					className="w-full"
				/>
				<SelectCollege
					colleges={colleges ?? []}
					onSelect={(college) => {
						setCollege(college);
					}}
					selected={college}
					loading={collegesLoading}
					label="College"
					placeholder="Select college"
				/>
				<SelectDepartment
					data={!college ? [] : departments ?? []}
					onSelect={(department) => {
						setSelectedDepartment(department);
					}}
					selected={selectedDepartment}
					loading={collegesLoading || departmentsLoading}
					label="Departments"
					placeholder={!college ? 'Select college first' : 'Select department'}
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
					value={selectedLevel}
					onSelect={(option) => {
						setSelectedLevel(option.value);
					}}
					onClear={() => {
						setSelectedLevel(undefined);
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
					}}
					onClear={() => {
						setSemester('');
					}}
					value={semester}
					label="Select semester"
					placeholder={'Choose semester'}
					className="w-full"
				/>
			</div>
			<Link
				href={'/admin/documents/upload'}
				className="w-full md:w-[30%] bg-primary text-white hover:text-white text-sm hover:bg-primary/50 duration-300 rounded-md p-3 mt-4 flex gap-4 justify-center items-center">
				<FaPlus size={17} />
				Upload Document
			</Link>
		</div>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
			{/* {documents.map((document) => {
					return (
						<div
							className="border border-gray-300 rounded-md w-full md:w-[308px] h-[480px]  dark:bg-white/20 duration-200 hover:bg-gray-100 dark:hover:bg-white/50 flex flex-col cursor-pointer"
							key={document._id}>
							<Image
								src={document.url}
								alt={document.name}
								width={360}
								height={150}
								className="rounded-md w-full h-[150px] object-cover rounded-b-lg"
							/>
							<div className="flex flex-col p-2.5 space-y-3 my-auto">
								<h2 className="w-full text-black font-bold">{document.name}</h2>
								<div className="max-w-[40%] text-[.7rem] text-white text-center bg-primary p-1.5 rounded-full">
									{document.document_type === 'lecture_note' ? 'LECTURE NOTE' : 'PAST QUESTION'}
								</div>
								<p className="text-gray-600 text-[.8rem]">
									{document.description.length > 60
										? `${document.description.substring(0, 60)}...`
										: document.description}
								</p>
								<div className="flex justify-start items-center gap-4">
									<p className="text-[.8rem] text-black">Department:</p>
									<p className="text-[.8rem] text-gray-600">{document.department.toUpperCase()}</p>
								</div>
								<div className="flex justify-start items-center gap-4">
									<p className="text-[.8rem] text-black">Level:</p>
									<p className="text-[.8rem] text-gray-600">{document.level}</p>
								</div>
								<div className="flex justify-start items-center gap-4">
									<p className="text-[.8rem] text-black">Semester:</p>
									<p className="text-[.8rem] text-gray-600">{document.semester_index}</p>
								</div>
								<div className="border-t border-gray-300 pt-2"></div>
								<div className="flex justify-between items-center gap-4">
									<button className="w-full bg-white text-black hover:text-black/50 text-sm hover:bg-white/50 duration-300 rounded-md p-1.5 flex gap-4 justify-center items-center">
										<FaRegEdit size={17} />
										Edit
									</button>
									<button className="w-full bg-red-500 text-white hover:text-white text-sm hover:bg-red-500/50 duration-300 rounded-md p-1.5 flex gap-4 justify-center items-center">
										<FaDeleteLeft size={17} />
										Delete
									</button>
								</div>
							</div>
						</div>
					);
				})} */}
		</div>
	</section>
);
};
export default DocumentPage;
