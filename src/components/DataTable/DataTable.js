import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
    { id: '3', title: 'Task 3', completed: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState('');
  const [editTodoText, setEditTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = {
        id: (todos.length + 1).toString(),
        title: newTodoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      setModalVisible(false);
    }
  };

  const editTodo = () => {
    if (editTodoText.trim() !== '') {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodoId ? { ...todo, title: editTodoText } : todo
        )
      );
      setEditModalVisible(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text
                style={[
                  styles.todoText,
                  { textDecorationLine: item.completed ? 'line-through' : 'none' },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.addButton}>Add New Todo</Text>
      </TouchableOpacity>

      {/* Add New Todo Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Todo"
            value={newTodoText}
            onChangeText={(text) => setNewTodoText(text)}
          />
          <TouchableOpacity onPress={addTodo}>
            <Text style={styles.modalButton}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Edit Todo Modal */}
      <Modal animationType="slide" transparent={true} visible={editModalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit Todo"
            value={editTodoText}
            onChangeText={(text) => setEditTodoText(text)}
          />
          <TouchableOpacity onPress={editTodo}>
            <Text style={styles.modalButton}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <Text style={styles.modalButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: 'blue', // Change the color to blue
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  todoText: {
    fontSize: 18,
    color: 'black', // Change the color to black
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  addButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButton: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 8,
  },
});

export default TodoList;
