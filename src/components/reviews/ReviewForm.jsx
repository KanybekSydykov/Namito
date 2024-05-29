"use client";
import React, { useState, useEffect } from "react";
import LeaveReview from "./LeaveReview";
import { Flex, Text, Textarea, Button, Image, Box, useToast } from "@chakra-ui/react";
import { postData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";

const ReviewForm = ({ params, token }) => {
  const [reviewText, setReviewText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesPreview, setSelectedFilesPreview] = useState([]);
  const [rating, setRating] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const toast = useToast();

  function clearAll(){
    setReviewText("");
    setSelectedFiles([]);
    setSelectedFilesPreview([]);
    setRating(0);
    setRequesting(false);
  }

  function getProductRating(value) {
    setRating(value);
  }

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    try {
        const filePreviews = await Promise.all(files.map(file => readFileAsDataURL(file)));
        setSelectedFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            ...files,
        ]);
        setSelectedFilesPreview((prevSelectedFilesPreview) => [
            ...prevSelectedFilesPreview,
            ...filePreviews,
        ]);
    } catch (error) {
        console.error('Error reading files:', error);
    }
};

const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

console.log(selectedFiles);

  function handleDeleteImage(index) {
    URL.revokeObjectURL(selectedFilesPreview[index]);

    // Remove the file and its preview from the state
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((_, i) => i !== index)
    );
    setSelectedFilesPreview((prevSelectedFilesPreview) =>
      prevSelectedFilesPreview.filter((_, i) => i !== index)
    );
  }
  async function handleSubmitReview() {
    setRequesting(true);
  
    const formData = new FormData();
    formData.append('text', reviewText);
    formData.append('rating', rating);
    formData.append('product', params.reviewId);
    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });
  
    try {
      const response = await fetch(`${ENDPOINTS.postReview()}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
          // 'Content-Type': 'multipart/form-data' // Do not explicitly set Content-Type for FormData
        }
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.status >= 200 && response.status < 400) {
        toast({
          title: "Отзыв добавлен",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        })
        clearAll();

        // Handle success here
      } else {
        console.log("Validation errors:", data);
        // Handle validation errors here
      }
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setRequesting(false);
    }
  }
  

console.log(selectedFilesPreview);

  useEffect(() => {
    return () => {
      // Revoke the object URLs to avoid memory leaks
      selectedFilesPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFilesPreview]);

  return (
    <Flex w={"100%"} flexDir={"column"} gap={"20px"} maxW={"493px"}>
      <Text
        fontFamily={"roboto"}
        fontWeight={"500"}
        fontSize={"18px"}
        lineHeight={"21px"}
      >
        Оцените товар
      </Text>

      <LeaveReview getProductRating={getProductRating} />

      <Textarea
        rows={4}
        resize={"none"}
        placeholder="Оставьте отзыв о товаре"
        fontFamily={"roboto"}
        _placeholder={{
          fontFamily: "roboto",
          fontWeight: "300",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#767676",
        }}
        border={"1px solid #A0A0A0"}
        borderRadius={"10px"}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></Textarea>

      {selectedFilesPreview.length > 0 && (
        <Flex
          flexDir={"row"}
          gap={"8px"}
          flexWrap={"nowrap"}
          overflowX={"auto"}
          mt={"20px"}
        >
          {selectedFilesPreview.map((item, index) => (
            <Button
              key={item}
              p={"1px"}
              minH={"unset"}
              minW={"unset"}
              bg={"transparent"}
              width="53px"
              height="64px"
              position={"relative"}
              _hover={{
                bg: "transparent",
              }}
              role="group"
            >
              <Image
                src={item}
                alt={`preview-${index}`}
                width={49}
                height={64}
                style={{
                  width: "53px",
                  height: "64px",
                  borderRadius: "2px",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                bg="rgba(0,0,0,0.3)"
                zIndex={-1}
                opacity={0}
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                transition={"all 0.3s ease"}
                onClick={() => handleDeleteImage(index)}
                _groupHover={{
                  zIndex: 1,
                  opacity: 1,
                  scale: 1.2,
                }}
              >
                <Image src="/delete-icon.svg" />
              </Box>
            </Button>
          ))}
        </Flex>
      )}

      <Flex flexDir={"row"} gap={"16px"} h={"52px"}>
        <Button
          width={"auto"}
          h={"100%"}
          display={"flex"}
          flexGrow={1}
          bg={"transparent"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"1px solid orange"}
          borderRadius={"10px"}
          maxW={"320px"}
          boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.2)"}
          color={"orange"}
          fontFamily={"roboto"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"24px"}
          _hover={{
            bg: "orange",
            color: "white",
          }}
          onClick={handleSubmitReview}
          isLoading={requesting}
          loadingText="Отправка..."
          colorScheme="teal"
          variant="outline"
        >
          * Оставить отзыв
        </Button>

        <Button
          h={"100%"}
          bg={"transparent"}
          border={"1px solid #767676"}
          w={"52px"}
          borderRadius={"10px"}
          boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.2)"}
          _hover={{
            bg: "rgb(54,54,54)",
            filter: "invert(1)",
          }}
          position={"relative"}
        >
          <Image
            src={"/upload-icon.svg"}
            alt={"upload-icon"}
            width={20}
            height={20}
          />
          <input
            type="file"
            multiple
            style={{
              position: "absolute",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              opacity: "0",
            }}
            onChange={handleFileChange}
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReviewForm;
