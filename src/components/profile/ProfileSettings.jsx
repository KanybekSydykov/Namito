"use client";

import { Flex, Box, Text, Input, Button, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { ENDPOINTS } from "@/API/endpoints";
import { useParams, useRouter } from "next/navigation";
const serverProfileImg =
  "https://raw.githubusercontent.com/tturdumamatovv/Namito/main/assets/images/default-user.jpg";

const ProfileSettings = ({ data, token }) => {
  const [isEdit, setIsEdit] = useState(data.first_visit);
  const [name, setName] = useState(data.full_name || "");
  const [email, setEmail] = useState(data.email || "");
  const [dob, setDob] = useState(data.date_of_birth || "");
  const [requestPending, setRequestPending] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    data.profile_picture === serverProfileImg
      ? "/profile-icons/profile-icon.svg"
      : data.profile_picture
  );
  const router = useRouter();
  const {locale} = useParams();

  const toast = useToast();

  const handleFormSubmit = async (e) => {
    setIsEdit(true);
    e.preventDefault();
    if (isEdit && data) {
      const isChanged =
      name !== data.full_name ||
      email !== data.email ||
      dob !== data.date_of_birth ||
      profilePictureFile;
    if (!isChanged) {
      // If no values have changed, do not send the request
      setIsEdit(false);
      return;
    }
      try {

     

        setRequestPending(true);
        const formData = new FormData();
            // Append only changed values
            if (name !== data.full_name) {
              formData.append("full_name", name);
            }
            if (email !== data.email) {
              formData.append("email", email);
            }
            if (dob !== data.date_of_birth) {
              formData.append("date_of_birth", dob);
            }
            if (profilePictureFile) {
              formData.append("profile_picture", profilePictureFile);
            }

            formData.append('first_visit', false);

        const response = await fetch(ENDPOINTS.patchUserProfile(), {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const responseData = await response.json();

        if (response.status >= 200) {
          setIsEdit(false);
          toast({
            title: locale === 'ru' ? "Профиль успешно обновлен" : "Profile updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          setName(responseData.full_name);
          setEmail(responseData.email);
          setDob(responseData.date_of_birth);
          setProfilePictureUrl(responseData.profile_picture);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setRequestPending(false);
        setIsEdit(false);
        router.refresh();
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePictureUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveText = locale === 'ru' ? "Сохранить" : "Save";
  const editText = locale === 'ru' ? "Редактировать" : "Edit";

  return (
    <Flex
      flexDir={"column"}
      gap={"30px"}
      fontFamily={"roboto"}
      position={"relative"}
      pb={"20px"}
      px={"16px"}
      w={"100%"}
      maxW={{base:'100%',lg:'500px'}}
    >
      <Box position={"relative"} w={"max-content"} h={"max-content"}>
        <Box
          w={"80px"}
          h={"80px"}
          borderRadius={"50%"}
          overflow={"hidden"}
          pos={"relative"}
        >
          <Image src={profilePictureUrl} width={80} alt="profile" height={80} />
      {isEdit &&  <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "pointer",
              zIndex: 2,
              opacity: 0,
              width: "100%",
              height: "100%",
            }}
          />}
        </Box>
        <Image
          src={"/profile-icons/captureIcon.svg"}
          width={30}
          height={30}
          alt="profile capture icon"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            cursor: "pointer",
            zIndex: 1,
          }}
        />
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Flex flexDir={"column"} gap={"16px"}>
          <Flex flexDir={"column"} gap={"9px"}>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"rgba(54, 54, 54, 1)"}
            >
             {locale === 'ru' ? 'Ваше ФИО *' : 'Your full name *'}
            </Text>
            <Input
              placeholder="Например: Асанов Асан"
              value={name}
              onChange={(e) => setName(e.target.value)}
              py={"13.5px"}
              height={"auto"}
              readOnly={isEdit ? false : true}
              borderRadius={"10px"}
              borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
              _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
              _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
              _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
              transition={"all 0.3s ease"}
            />
          </Flex>
          <Flex flexDir={"column"} gap={"9px"}>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"rgba(54, 54, 54, 1)"}
            >
             {locale === 'ru' ? 'Дата рождения *' : 'Date of birth *'}

            
            </Text>
            <Input
              placeholder="дд.мм.гггг"
              py={"13.5px"}
              height={"auto"}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              readOnly={isEdit ? false : true}
              borderRadius={"10px"}
              type="date"
              borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
              _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
              _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
              _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
              transition={"all 0.3s ease"}
            />
          </Flex>
          <Flex flexDir={"column"} gap={"9px"}>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"rgba(54, 54, 54, 1)"}
            >
             {locale === 'ru' ? 'Электронный адрес почты (e-mail) *' : 'Email address (e-mail) *'}
            </Text>
            <Input
              placeholder="example@gmail.com"
              py={"13.5px"}
              height={"auto"}
              readOnly={isEdit ? false : true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderRadius={"10px"}
              borderColor={isEdit ? "rgba(160, 160, 160, 1)" : "transparent"}
              _focus={{ borderColor: isEdit ? "orange" : "transparent" }}
              _hover={{ borderColor: isEdit ? "orange" : "transparent" }}
              _focusVisible={{ borderColor: isEdit ? "orange" : "transparent" }}
              transition={"all 0.3s ease"}
            />
          </Flex>
          <Flex flexDir={"column"} gap={"9px"}>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"rgba(54, 54, 54, 1)"}
            >
             {locale === 'ru' ? 'Номер телефона *' : 'Phone number *'}
            </Text>
            <Input
              placeholder={data.phone_number}
              _placeholder={{ color: "#000" }}
              py={"13.5px"}
              height={"auto"}
              readOnly={true}
              borderRadius={"10px"}
              borderColor={"transparent"}
              _focus={"transparent"}
              _hover={"transparent"}
              _focusVisible={"transparent"}
              transition={"all 0.3s ease"}
            />
          </Flex>
        </Flex>

        <Button
          width={"100%"}
          maxW={{ base: "unset", lg: "355px" }}
          type="submit"
          textAlign={"center"}
          py={"15px"}
          borderRadius={"10px"}
          bg={isEdit ? "rgba(56, 161, 105, 0.5)" : "rgba(203, 70, 9, .75)"}
          color={"#fff"}
          fontSize={"18px"}
          lineHeight={"25px"}
          fontWeight={"400"}
          mx="auto"
          h={"auto"}
          _hover={{
            bg: isEdit ? "rgba(56, 161, 105, 1)" : "rgba(203, 70, 9, 1)",
          }}
          disabled={requestPending}
          cursor={requestPending ? "not-allowed" : "pointer"}
        >
          {requestPending ? (
            <Spinner />
          ) : isEdit ? (
            saveText
          ) : (
           editText
          )}
        </Button>
      </form>
    </Flex>
  );
};

export default ProfileSettings;
