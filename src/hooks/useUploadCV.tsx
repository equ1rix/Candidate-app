import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';

type UseUploadCVProps = {
  candidateId: string;
};

const useUploadCV = ({ candidateId }: UseUploadCVProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  const storage = getStorage();

  useEffect(() => {
    const fetchCVUrl = async () => {
      if (candidateId) {
        const candidateDocRef = doc(db, 'candidates', candidateId);
        const candidateDoc = await getDoc(candidateDocRef);

        if (candidateDoc.exists()) {
          setCvUrl(candidateDoc.data()?.cvUrl || null);
        }
      }
    };

    fetchCVUrl();
  }, [candidateId]);

  const uploadCV = async (file: File) => {
    setUploading(true);
    setError(null);

    const fileRef = ref(storage, `cv/${candidateId}/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      await updateDoc(doc(db, 'candidates', candidateId), {
        cvUrl: fileURL
      });
      setCvUrl(fileURL);
      setUploading(false);
    } catch (error) {
      setError('Error uploading CV');
      setUploading(false);
    }
  };

  return {
    uploadCV,
    uploading,
    error,
    cvUrl
  };
};

export default useUploadCV;
