'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface DocumentShimmerProps {
  viewMode?: 'grid' | 'list';
}

export default function DocumentShimmer({
  viewMode = 'grid',
}: DocumentShimmerProps) {
  if (viewMode === 'list') {
    return (
      <>
        <div className=" bg-[#F3F4F6] flex items-center border rounded-lg p-4  0 hover:bg-gray-100  transition-colors hover-lift animate-pulse">
          <div className="mr-4 rounded-full w-[30px] h-[30px] bg-gray-300"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-[50px] h-[30px] rounded-sm bg-gray-300"></div>
            </div>
            <h3 className="w-full max-w-[150px] h-[15px] bg-gray-300 rounded-md"></h3>
            <div className="mt-1 max-w-[250px] rounded-sm w-full h-[20px] bg-gray-300"></div>
          </div>
          <div className="ml-4 flex items-center justify-end gap-2">
            <div className="w-[150px] h-[40px] rounded-md bg-gray-300"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden  bg-[#F3F4F6] hover:border-blue-200  transition-all duration-300 hover-lift animate-pulse">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-[50px] h-[30px] rounded-md bg-gray-300"></div>
            </div>
          </div>
          <h3 className="w-full h-[15px] bg-gray-300 rounded-md"></h3>
        </CardHeader>
        <CardContent className="pb-2 rounded-md bg-gray-300 h-[150px] mx-4"></CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-end">
            <div className="w-[150px] h-[40px] rounded-md bg-gray-300"></div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
