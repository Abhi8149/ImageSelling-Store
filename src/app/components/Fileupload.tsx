import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react";
export default function Fileupload({OnSuccess,}:{OnSuccess:(res:IKUploadResponse)=>void}) {
    const [error, seterror] = useState<string | null>(null);
    const [loading, setloading] = useState<boolean>(false);

    const onError = (error: { message: string }) => {
        seterror(error.message);
        setloading(false);
    };

    const handleOnSuccess = (response: IKUploadResponse) => {
        console.log(response);
        setloading(false);
        OnSuccess(response)
        seterror(null)
    }
    
    const handleUploadStart = () => {
        setloading(true);
        seterror(null);
    }
    return (
        <div className="space-y-2">
          <IKUpload
          fileName="product-image.jpg"
          onError={onError}
          onSuccess={handleOnSuccess}
          onUploadStart={handleUploadStart}
          className="border border-dashed border-gray-500 p-4"
          validateFile={(file:File)=>{
            const allowedTypes=['image/png','image/jpeg','image/jpg']
            if(!allowedTypes.includes(file.type)){
                seterror('please upload of type png,jpg,jpeg')
                return false
            }

            if(file.size>5*1024*1024){
                seterror('file size should be less than 5mb')
                return false
            }

            return true
          }}
          />
            


        </div>
    )
}

