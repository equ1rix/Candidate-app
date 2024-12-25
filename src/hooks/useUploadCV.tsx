import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type UseUploadCVProps = {
  onUploadSuccess: (url: string) => void;
};

const useUploadCV = ({ onUploadSuccess }: UseUploadCVProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const storage = getStorage();

  const uploadCV = async (file: File) => {
    setUploading(true);
    setError(null);

    const fileRef = ref(storage, `cv/${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      onUploadSuccess(fileURL);
    } catch (error) {
      setError('Error uploading CV');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadCV,
    uploading,
    error
  };
};

export default useUploadCV;
