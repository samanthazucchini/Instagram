import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Post from './Post';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [
        {
          id: '1',
          usuario: 'Kaleo',
          fotoPerfil: 'https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg',
          imagem: 'https://www.parisfilmes.com.br/wp-content/uploads/2024/06/noticia-completa-todegraca.jpg',
          horario: '1 hora atrás',
          legenda: 'Assistindo mais um episódio de Tô de Graça 🤣📺',
          comentarios: 12,
          likeada: true,
          likers: 30
        },
        {
          id: '2',
          usuario: 'Albert',
          fotoPerfil: 'https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg',
          imagem: 'https://blog.fritzdobbert.com.br/wp-content/uploads/2016/11/arte154.png',
          horario: '3 horas atrás',
          legenda: 'Momento de paz ao piano. 🎹✨',
          comentarios: 8,
          likeada: false,
          likers: 15
        },
        {
          id: '3',
          usuario: 'Murilo',
          fotoPerfil: 'https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg',
          imagem: 'https://s2-ge.glbimg.com/phwb9MoMNf9Af1Qe2b9jScCXiQY=/0x0:1260x758/924x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2018/04/21/14468203_518884024988112_1041051567272255489_o.jpg',
          horario: '5 horas atrás',
          legenda: 'Treino de vôlei foi insano hoje! 🏐💪',
          comentarios: 5,
          likeada: false,
          likers: 0
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Instagram</Text>
        </View>

        <FlatList
          data={this.state.feed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post data={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
