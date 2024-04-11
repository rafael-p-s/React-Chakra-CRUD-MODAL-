import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export function ModalComp({ data, setData, dataEdit, isOpen, onClose }) {
  const [name, setName] = useState(dataEdit?.name);
  const [email, setEmail] = useState(dataEdit?.email);

  const handleSave = () => {
    // Verifica se tem informações no nome e email
    if (!name || !email) return;
    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    // \/ Vai verificar se é uma edição(upload),caso seja vai pegar as novas informações:
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email };
    }

    // Vai verificar, caso não seja uma edição, vai pegar todos os itens cadastrado + os itens novos.
    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, email }]
      : [...(data ? data : [])]; // Se não for fazer upload das edições.

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray)); // utilizada para salvar dados no armazenamento local do navegador (local storage).

    setData(newDataArray); // vai criar no App.jsx

    onClose(); // fecha o modal.
  };

  function emailAlreadyExists() {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email);
    }
    return false;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* \/ Deixa o redor do MODAL mais escuro */}
        <ModalOverlay />
        <ModalContent>
          {/* Conteudo do MODAL */}
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
