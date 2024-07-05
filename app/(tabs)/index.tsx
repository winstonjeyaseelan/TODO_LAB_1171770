import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../scripts/styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref,remove,push, update, onValue, off } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCynqUHT6r-exa59Uw29a4aukYgJiXcHTo",
  authDomain: "info-6132-1171770.firebaseapp.com",
  databaseURL: "https://info-6132-1171770-default-rtdb.firebaseio.com",
  projectId: "info-6132-1171770",
  storageBucket: "info-6132-1171770.appspot.com",
  messagingSenderId: "1000596334437",
  appId: "1:1000596334437:web:219b3978ce909d7e7d238c",
  measurementId: "G-5HTEB81Z8X"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

type Task = {
  id: string;
  title: string;
  status: 'due' | 'done';
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const tasksRef = ref(db, 'tasks');
    const fetchData = () => {
      onValue(tasksRef, (snapshot) => {
        const tasksData = snapshot.val();
        if (tasksData) {
          const tasksArray = Object.keys(tasksData).map((taskId) => ({
            id: taskId,
            ...tasksData[taskId],
          }));
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
      });
    };

    fetchData();

    return () => {
      off(tasksRef); // Clean up listener on unmount
    };
  }, []);

  const addTask = () => {
    if (taskTitle.trim().length > 0) {
      const newTaskRef = push(ref(db, 'tasks'));
      update(newTaskRef, {
        title: taskTitle,
        status: 'due',
      });
      setTaskTitle('');
    }
  };

  const toggleTaskStatus = (taskId: string, newStatus: 'due' | 'done') => {
    const taskRef = ref(db, `tasks/${taskId}`);
    update(taskRef, { status: newStatus });
  };

  const deleteTask = (taskId: string) => {
    const taskRef = ref(db, `tasks/${taskId}`);
  
    remove(taskRef)
      .then(() => {
        console.log('Task deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>{item.status === 'done' ? 'Done' : 'Due'}</Text>
      </View>
      <View style={styles.taskActions}>
        <Switch
          value={item.status === 'done'}
          onValueChange={(value) => toggleTaskStatus(item.id, value ? 'done' : 'due')}
        />
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Winstons Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: taskTitle.trim() ? '#007bff' : '#c0c0c0' },
          ]}
          onPress={addTask}
          disabled={!taskTitle.trim()}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default App;
