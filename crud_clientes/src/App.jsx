import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalComp } from "./components/ModalComponents";

function App() {
  //useDisclosure serve para controlar o modal, aberto ou fechado.
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({ base: true, lg: false }); // função para verificar se é mobile.
  //useBreakpointValue << Hook do Chakra.

  // Vai carregar os dados do local storage, sendo declarado db_costumer.
  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente")) // caso tenha algum dado vai ser carregado aqui.
      : []; // se não tiver dados, um array limpo.

    setData(db_costumer); //setando os dados pegos no localStorage
  }, [setData]);

  //Função para DELETAR:
  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email); // pega o data e faz um filtro para verificar se tem o email escolhido.

    setData(newArray); // Caso for excluido vai recarregar os itens em tela

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <>
      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      >
        <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
          <Button
            colorScheme="blue"
            onClick={() => [setDataEdit({}), onOpen()]}
          >
            NOVO CADASTRO
          </Button>
          <Box overflowY="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Nome
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    E-Mail
                  </Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({ name, email }, index) => (
                  <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                    <Td maxw={isMobile ? 5 : 100}>{name}</Td>
                    <Td maxw={isMobile ? 5 : 100}>{email}</Td>
                    <Td p={0}>
                      {/* Desse modo \/, onClick={()=> [] << esse [] está passando a informação de varias tarefas a serem feitas ao clicar.} */}
                      <EditIcon
                        fontSize={20}
                        onClick={() => {
                          setDataEdit({ name, email, index });
                          onOpen();
                        }}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {/* Verifica se o modal está aberto */}
        {isOpen && (
          <ModalComp
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}
      </Flex>
    </>
  );
}

export default App;
