import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.data,
      animatedScale: new Animated.Value(0),
      showLike: false
    };

    this.pegarIconeDoPost = this.pegarIconeDoPost.bind(this);
    this.curtirPost = this.curtirPost.bind(this);
    this.mostrarLikesDoPost = this.mostrarLikesDoPost.bind(this);
    this.toqueImagemDoPost = this.toqueImagemDoPost.bind(this);

    this.lastTap = null;
  }

  pegarIconeDoPost(likeada) {
    return likeada
      ? { uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png' }
      : { uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' };
  }

  mostrarLikesDoPost(likers) {
    if (likers <= 0) return null;
    return (
      <Text style={styles.likes}>
        {likers} {likers > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

  curtirPost() {
    let feed = this.state.feed;

    if (feed.likeada === true) {
      this.setState({
        feed: {
          ...feed,
          likeada: false,
          likers: feed.likers - 1
        }
      });
    } else {
      this.setState({
        feed: {
          ...feed,
          likeada: true,
          likers: feed.likers + 1
        }
      }, this.animarLikeDoPost);
    }
  }

  animarLikeDoPost() {
    this.setState({ showLike: true }, () => {
      this.state.animatedScale.setValue(0.3);
      Animated.spring(this.state.animatedScale, {
        toValue: 1,
        useNativeDriver: true
      }).start(() => {
        setTimeout(() => this.setState({ showLike: false }), 800);
      });
    });
  }

  toqueImagemDoPost() {
    let agora = Date.now();
    let TEMPO_TOQUE_DUPLO = 300;
    if (this.lastTap && (agora - this.lastTap) < TEMPO_TOQUE_DUPLO) {
      this.curtirPost();
    }
    this.lastTap = agora;
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: this.state.feed.fotoPerfil }} style={styles.avatar} />
            <Text style={styles.user}>{this.state.feed.usuario}</Text>
          </View>
          <Text style={styles.time}>{this.state.feed.horario}</Text>
        </View>

        <TouchableWithoutFeedback onPress={this.toqueImagemDoPost}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: this.state.feed.imagem }}
              style={styles.postImage}
              resizeMode="cover"
            />
            {this.state.showLike && (
              <Animated.Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png' }}
                style={[
                  styles.heartOverlay,
                  { transform: [{ scale: this.state.animatedScale }] }
                ]}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={this.curtirPost}>
            <Image
              source={this.pegarIconeDoPost(this.state.feed.likeada)}
              style={styles.smallIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1380/1380338.png' }}
              style={styles.smallIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/786/786205.png' }}
              style={styles.smallIcon}
            />
          </TouchableOpacity>
        </View>

        {this.mostrarLikesDoPost(this.state.feed.likers)}

        <View style={styles.captionRow}>
          <Text style={styles.user}>{this.state.feed.usuario}</Text>
          <Text style={styles.caption}> {this.state.feed.legenda}</Text>
        </View>

        <Text style={styles.comments}>
          Ver todos os {this.state.feed.comentarios} comentários
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 25,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  caption: {
    fontSize: 14,
  },
  comments: {
    paddingHorizontal: 10,
    marginTop: 5,
    color: '#555',
    fontSize: 13,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 8,
  },
  smallIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
  },
  likes: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  heartOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    width: 100,
    height: 100,
    opacity: 0.7,
  }
});

export default Post;
