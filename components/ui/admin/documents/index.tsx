'use client';
import SelectField from '@/components/common/inputs/select-field';
import { documents } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaDeleteLeft, FaPlus } from 'react-icons/fa6';

const DocumentPage = () => {
	const [documentType, setDocumentType] = useState<string>('');
	const [department, setDepartment] = useState<string>('');
	return (
		<section>
			<div className="flex justify-start items-center gap-8 mt-6">
				<SelectField
					data={{
						label: documentType,
						value: documentType,
					}}
					onValueChange={(d) => setDocumentType(d)}
					options={['LECTURE NOTE', 'PAST QUESTION'].map((p) => ({
						label: p,
						value: p,
					}))}
					label="Select document type"
					placeholder="Document type"
					containerProps={{ className: 'w-full' }}
				/>
				{/* <SelectField
					data={{
						label: department,
						value: department,
					}}
					onValueChange={(d) => setDepartment(d)}
					options={departments.map((p) => ({
						label: p,
						value: p,
					}))}
					label="Select department"
          placeholder="Department"
				/> */}
				<SelectField
					// data={{
					//   label: type,
					//   value: type,
					// }}
					onValueChange={(d) => console.log('type', d)}
					options={['1ST', '2ND'].map((p) => ({
						label: p,
						value: p,
					}))}
					label="Select semester"
					placeholder="Semester"
					containerProps={{ className: 'w-full' }}
				/>
				<Link
					href={'/admin/documents/upload'}
					className="w-full bg-primary text-white hover:text-white text-sm hover:bg-primary/50 duration-300 rounded-md p-3 mt-4 flex gap-4 justify-center items-center">
					<FaPlus size={17} />
					Upload Document
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
				{documents.map((document) => {
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
				})}
			</div>
		</section>
	);
};
export default DocumentPage;
