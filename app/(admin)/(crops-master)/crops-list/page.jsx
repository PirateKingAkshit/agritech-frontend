import CropsList from '@/components/admin/crops-master/crops-list'
import React from 'react'
import { Suspense } from 'react'
const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CropsList />
      </Suspense>
    </>
  )
}

export default page
