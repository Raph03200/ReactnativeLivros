import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert} from 'react-native';
import {Camera} from 'expo-camera'
import { useState } from 'react';

export default function App() {
  const [livro, setLivro] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [genero, setGenero] = useState('');
  const [temPermissaoCamera, setTemPermissaoCamera] = useState(null);
  const [foto, setFoto] = useState(null);
  const [cameraRef,setCameraRef] = useState(null);

  useEffect(() =>{
    //Solicita permissão da câmera
    (async() =>{
      const {status: cameraStatus} = await Camera.requestCameraPermissionsAsync();
      setTemPermissaoCamera(cameraStatus === 'granted');
    })();
  },[]);

  const enviarLivro = () => {
    if(!titulo || !autor || !anoLancamento || !genero){
      Alert.alert('Erro', 'Preencha todos os campos para registrar o livro');
      return;
    }

    const novoLivro = {
      titulo,
      autor,
      anoLancamento,
      genero,
      foto,
    };
    setLivro(novoLivro);

    setTitulo('');
    setAnoLancamento('');
    setAutor('');
    setGenero('');
    setFoto('');
    Alert.alert('Livro Registrado', 'Um novo livro foi registrado com sucesso!');
  };

    const tirarFoto = async() => {
      if(cameraRef){
        const fotoCapturada = await cameraRef.takePictureAsync();
        setFoto(fotoCapturada.uri);
      }
    };
  

    return (
      <View style={styles.container} id = "livroForm">
        <Text style={styles.title}>Registrar Livro na Livraria X</Text>
  
        <TextInput id="titulo"
          style={styles.input}
          placeholder="Título do livro"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput id="autor"
          style={[styles.input, styles.textArea]}
          placeholder="Autor do livro"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput id="anoLancamento"
          style={[styles.input, styles.textArea]}
          placeholder="Ano de Lançamento"
          value={anoLancamento}
          onChangeText={setAnoLancamento}
        />
        <TextInput id="genero"
          style={[styles.input, styles.textArea]}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />
  
        {temPermissaoCamera ? (
          <View style={styles.cameraContainer} id="imagem">
            <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} />
            <Button title="Tirar Foto" onPress={tirarFoto} />
          </View>
        ) : (
          <Text style={styles.texto}>Permissão para câmera não concedida</Text>
        )}
  
        <Button title="Registrar Livro" onPress={enviarLivro} />
  
        {livro && (
          <View style={styles.livroContainer}>
            <Text style={styles.subTitle}>Livro Registrado:</Text>
            <Text style={styles.livroText}>Título: {livro.titulo}</Text>
            <Text style={styles.livroText}>Autor: {livro.autor}</Text>
            <Text style={styles.livroText}>Ano de Lançamento: {livro.anoLancamento}</Text>
            <Text style={styles.livroText}>Gênero: {livro.genero}</Text>
            <Image source={{ uri: foto }} style={styles.imagem}/>
          </View>
        )}
      </View>
    );
  }
  <script src = "Api.js"></script>
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
  },
  livroContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  livroText: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagem: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  camera: {
    width: 300,
    height: 300,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});