import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ref, uploadBytes } from 'firebase/storage'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { MdClose, MdCloudUpload } from 'react-icons/md'
import { BsCheckLg } from 'react-icons/bs'
import type { UploadProps } from './types'
import { storage } from '@/lib/utils/firebase'
import styles from './Upload.module.scss'

const Upload = ({ name, acceptFile, ...restProps }: UploadProps): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const methods = useFormContext()
  const { register, unregister, setValue, watch } = methods
  const files: File[] = watch(name)

  const isDisabled = !!files?.length
  const isNotUrlImage = watch('imagesUrl') === undefined

  const onDrop = useCallback((droppedFile: File[]) => {
    setValue(name, droppedFile, { shouldValidate: true })
  }, [name, setValue])

  const uploadImages = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!files?.length) return
    setLoading(true)
    const uniqueId = uuid()
    const imagesToUpload = files[0]
    const imageRef = ref(storage, `images/${uniqueId}/${imagesToUpload.name}`)
    try {
      const upload = await uploadBytes(imageRef, imagesToUpload)
      const saveUrl = `%2F${uniqueId}%2F${imagesToUpload.name}`

      if (upload) {
        setValue('imagesUrl', saveUrl)
        setValue('uniqueId', uniqueId)
        setLoading(false)
        toast.success('Image uploaded successfully')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.info(error.message)
      }
    }
  }, [files, setValue])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: acceptFile,
    disabled: isDisabled
  })

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [name, register, unregister])

  return (
    <>
      <div
        className={styles.container}
        {...getRootProps()}
      >
        {
            files?.length ?
              <div className={styles.file_wrapper}>
                <button
                  className={`${isLoading ? styles.animate_bounce : ` ${isNotUrlImage ? styles.btn_no_file : ''}`}`}
                  disabled={!isNotUrlImage}
                  onClick={async (e) => await uploadImages(e)}
                >
                  {
                    !isLoading && !isNotUrlImage ?
                      <BsCheckLg
                        size={24}
                        className={styles.success}
                      /> :
                      <MdCloudUpload size={30} />
                  }
                </button>
                {
                !isNotUrlImage ?
                  null :
                  <button
                    className={styles.btn_no_file}
                    onClick={() => setValue('images', '')}
                  >
                    <MdClose size={30}/>
                  </button>
                }
              </div>
              :
              null
        }
        <input
          {...restProps}
          id={name}
          {...getInputProps()}
        />
        {
        files?.length ?
          files.map((file) => {
            return (
              <Image
                key={file?.name}
                src={URL.createObjectURL(file)}
                alt={'Product name'}
                width={'0'}
                height={'0'}
                sizes={'100vw'}
                className={styles.img_wrapper}
              />
            )
          }) :
          <div className={styles.drag_and_drop}>
            {
            isDragActive ?
              <p>Drop the product image here</p> :
                (
                  <>
                    <p className={styles.subtitle_drag}>Drag &apos;n&apos; drop product image</p>
                    <p className={styles.subtitle_choose}>Choose product image</p>
                  </>
                )
            }
          </div>
        }
      </div>
    </>
  )
}

export default Upload
