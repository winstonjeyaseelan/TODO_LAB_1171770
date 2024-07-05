import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F7', // Light blue background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333', // Dark gray header text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // White input container
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 4, // Add shadow for depth
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333', // Dark text color
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#5AAC44', // Green add button
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF', // White task item background
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // Add slight shadow
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark title text
  },
  taskStatus: {
    fontSize: 16,
    color: '#777', // Medium gray status text
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
