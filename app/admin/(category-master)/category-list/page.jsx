import CategoryList from '@/components/admin/category-master/category-list'
import React from 'react'
import { Suspense } from 'react'
const page = () => {
  return (
    <>
      <Suspense fallback={<div className='flex justify-center items-center h-screen'>Loading...</div>}>
        <CategoryList />
      </Suspense>
    </>
  )
}

export default page
