import React, { useState } from "react";
import { Box, Button, Container, VStack, Image, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

// This is a mock function to simulate image captioning, replace with actual API call
const getCaptionForImage = async (image) => {
  // This should be where you call the gpt-4-vision-preview API
  // For now, it returns a mocked caption
  return "A caption describing what is in the image.";
};

const Index = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        // Here you would call your API to get the caption
        getCaptionForImage(e.target.result).then(setCaption);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptioning = async () => {
    try {
      const captionResult = await getCaptionForImage(imageSrc);
      setCaption(captionResult);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get caption for the image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} marginY={8}>
        <Box>
          {imageSrc ? (
            <Image boxSize="sm" src={imageSrc} alt="Uploaded image" />
          ) : (
            <Box padding={10} border="2px dashed gray">
              Upload an image to get started
            </Box>
          )}
        </Box>
        <Button leftIcon={<FaUpload />} onClick={() => document.getElementById("file-upload").click()}>
          Upload Image
        </Button>
        <Input id="file-upload" type="file" hidden onChange={handleImageUpload} />
        {caption && <Textarea value={caption} placeholder="Caption will appear here..." isReadOnly />}
        <Button colorScheme="blue" onClick={handleCaptioning} isDisabled={!imageSrc}>
          Get Caption
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
