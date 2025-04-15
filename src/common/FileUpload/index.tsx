import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Text,
  useToast,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
//import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage } from "react-icons/fa";

interface FileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  size?: string;
  label?: string;
  labelWidth?: string;
  isRequired?: boolean;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
}

const FileUpload = <T extends FieldValues>({
  name,
  control,
  size = "sm",
  label,
  labelWidth = "75px",
  isRequired = false,
  maxSizeInMB = 5,
  acceptedFileTypes = [
    'image/*', 
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ],
}: FileUploadProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const toast = useToast();
  const [filename, setFilename] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const determineFileType = (file: File) => {
    const fileType = file.type;
    
    if (fileType.startsWith('image/')) return 'image';
    if (fileType === 'application/pdf') return 'pdf';
    if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      fileType === 'application/vnd.ms-excel'
    ) return 'excel';
    if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      fileType === 'application/msword'
    ) return 'word';
    
    return 'unknown';
  };

  const handleChooseFile = () => {
    inputFileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check
    const maxSize = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        status: "error", 
        description: `File size should not exceed ${maxSizeInMB} MB`
      });
      return;
    }

    // File type check
    const fileType = determineFileType(file);
    
    // Create preview for images
    let preview: string | null = null;
    if (fileType === 'image') {
      preview = URL.createObjectURL(file);
    }

    // Update state
    field.onChange(file);
    setFilename(file.name);
    setPreviewUrl(preview);
    setFileType(fileType);
  };

  const handleClearFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      field.onChange(null);
      setFilename("");
      
      // Revoke existing preview URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setPreviewUrl(null);
      setFileType(null);
    }
  };

  const openFileInDefaultApp = () => {
    if (!field.value) return;

    const file = field.value as File;
    const url = URL.createObjectURL(file);
    
    try {
      switch(fileType) {
        case 'excel':
          window.open(`ms-excel:ofv|u|${url}`, '_blank');
          break;
        case 'word':
          window.open(`ms-word:ofv|u|${url}`, '_blank');
          break;
        case 'pdf':
          window.open(url, '_blank');
          break;
        default:
          toast({
            status: "info",
            description: "Cannot open this file type directly"
          });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Failed to open file"
      });
    }
  };

  // Handle double click on the input field
  const handleDoubleClick = () => {
    if (fileType === 'image' && previewUrl) {
      setIsPreviewOpen(true);
    } else if (['excel', 'word', 'pdf'].includes(fileType || '')) {
      openFileInDefaultApp();
    }
  };

  return (
    <FormControl isInvalid={!!error} display="flex" flexDirection="column">
      {!!label && (
        <FormLabel 
          as="legend" 
          fontWeight="700" 
          fontSize="16px" 
          minWidth={labelWidth} 
          m={1.5}
        >
          {label}&nbsp;
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}
      
      <Flex width="100%" direction="column">
        <Flex gap={2} alignItems="center">
          <input 
            ref={inputFileRef} 
            type="file" 
            hidden 
            name={field.name} 
            onChange={handleChange} 
            accept={acceptedFileTypes.join(',')}
          />
          <Input
            isReadOnly
            type="text"
            value={filename}
            size={size}
            background="white"
            boxShadow="sm"
            fontSize="xs"
            padding="10px"
            flex={1}
            placeholder="No file chosen"
            onDoubleClick={handleDoubleClick}
            cursor={field.value ? "pointer" : "default"}
            title={field.value ? "Double-click to preview" : ""}
          />
          
          {field.value && (
            <IconButton
              onClick={handleClearFile}
              height="full"
              aria-label="Clear"
              icon={<AiOutlineClear />}
            />
          )}
          
          <IconButton
            onClick={handleChooseFile}
            height="full"
            aria-label="Choose"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
        
        {error && (
          <FormErrorMessage fontSize="2xs" mt={0.5}>
            {error.message}
          </FormErrorMessage>
        )}
      </Flex>

      {/* Image Preview Modal */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewUrl && (
              <VStack>
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  maxHeight="500px" 
                  objectFit="contain" 
                />
                <Text>{filename}</Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

export default FileUpload;