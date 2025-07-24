import {React, Suspense} from 'react'
import AddCrop from '@/components/admin/crops-master/add-crop'
const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AddCrop type="View" />
      </Suspense>
    </>
  )
}

export default page
