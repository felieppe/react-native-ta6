import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';   

import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const handleAdd = (e) => {
    setTasks([...tasks, { text: taskName, key: Date.now().toString() }]);
    setTaskName("")
  }

  const renderItem = ({ item }) => {
    const rightSwipe = (progress) => {
      const transX = progress.value * 200;
      const opacity = progress.value;
      return {
        transform: [{ translateX: transX }],
        opacity: withTiming(opacity, { duration: 300 })
      };
    };

    const handleDelete = (key) => {
      setTasks(tasks.filter(item => item.key !== key));
    }

    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={(progress) => (
          <Animated.View style={[styles.deleteAction, rightSwipe(progress)]}>
            <Text style={styles.deleteText} onPress={() => handleDelete(item.key)}>Eliminar</Text>
          </Animated.View>
        )}>
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de tareas</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputContainer__input}   
 placeholder="Escribe una tarea" onChangeText={text => setTaskName(text)} value={taskName} />
        <Button style={styles.inputContainer__button} title="Agregar" onPress={handleAdd} />
      </View>

      <View style={styles.showcase}>
        <Text style={styles.showcase__title}>Tareas agregadas</Text>
        <FlatList style={styles.showcase__list} data={tasks} renderItem={renderItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:   
 'center',
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
  },

  inputContainer:   
 {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputContainer__input: {
    width: "70%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },

  showcase: {
    width: "80%",
    marginTop: 30,
  },

  showcase__title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  showcase__list: {
    width: "100%",
  },

  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});