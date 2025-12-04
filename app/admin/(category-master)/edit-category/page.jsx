import {React, Suspense} from 'react'
import AddCategory from '@/components/admin/category-master/add-category'
const page = () => {
  return (
    <>
      <Suspense fallback={<div className='flex justify-center items-center h-screen'>Loading...</div>}>
        <AddCategory type="Edit" />
      </Suspense>
    </>
  )
}

export default page
