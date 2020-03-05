import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  CustomContextProvider,
  useCustomState,
  useCustomDispatch,
} from '@helpers/Todo';

function TodoButton({type, handlePress}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles[`${type}`], styles.TodoButton]}>
      <Text style={styles.todoButtonText}>{type}</Text>
    </TouchableOpacity>
  );
}
function TodoInput({task, setTask, purpose, item, handlePress}) {
  // const handleDone = ()
  //[styles[`${purpose}Todo`], done]
  switch (purpose) {
    case 'input':
    case 'edit':
      return (
        <TextInput
          style={styles.inputTodo}
          placeholder={'Write Your Task'}
          onChangeText={text => setTask(text)}
          editable
          value={task}
        />
      );
    case 'item':
      return (
        <Text
          onPress={() => handlePress({type: 'DONE', id: item.id})}
          style={[styles.itemTodo, item.done && styles.done]}>
          {item.task}
        </Text>
      );
    default:
      break;
  }
}
function TodoForm({purpose, item}) {
  const [value, setValue] = useState('');
  const dispatch = useCustomDispatch();
  const handlePress = payload => {
    dispatch(payload);
    setValue('');
  };
  const renderButton = () => {
    switch (purpose) {
      case 'input':
        return (
          <TodoButton
            type={'ADD'}
            handlePress={() => handlePress({type: 'ADD', task: value})}
          />
        );
      case 'edit':
        return (
          <TodoButton
            type={'DONE'}
            handlePress={() =>
              handlePress({type: 'UPDATE', id: item.id, task: value})
            }
          />
        );
      case 'item':
        return (
          <>
            <TodoButton
              type={'EDIT'}
              handlePress={() =>
                handlePress({type: 'EDIT', id: item.id, task: value})
              }
            />
            <TodoButton
              type={'DEL'}
              handlePress={() => handlePress({type: 'DEL', id: item.id})}
            />
          </>
        );
      default:
        break;
    }
  };
  return (
    <View style={styles.todoFormContainer}>
      <TodoInput
        purpose={purpose}
        item={item}
        task={value}
        setTask={setValue}
        handlePress={handlePress}
      />
      {renderButton()}
    </View>
  );
}

function TodoList() {
  const todos = useCustomState();
  return (
    <FlatList
      data={todos}
      style={styles.todoListContainer}
      renderItem={({item}) => (
        <TodoForm
          key={item.id}
          purpose={item.edit ? 'edit' : 'item'}
          item={item}
        />
      )}
    />
  );
}

function Todo() {
  return (
    <CustomContextProvider>
      <View style={styles.container}>
        <Text style={styles.header}>PROGRAPHY 6TH</Text>
        <TodoForm purpose={'input'} />
        <TodoList />
      </View>
    </CustomContextProvider>
  );
}

export default Todo;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: width * 0.05,
  },
  header: {
    color: '#C73549',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: width * 0.05,
  },
  todoFormContainer: {
    width: width * 0.9,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: width * 0.05,
  },
  inputTodo: {
    width: width * 0.9 * 0.8,
    height: 48,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    paddingLeft: 10,
  },
  itemTodo: {
    width: width * 0.6,
    height: 48,
    fontSize: 18,
    fontWeight: '200',
    paddingLeft: 10,
    lineHeight: 48,
  },
  done: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#C73549',
    color: '#C9CBCF',
  },
  TodoButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ADD: {
    width: width * 0.9 * 0.2,
    backgroundColor: '#C73549',
  },
  EDIT: {
    width: width * 0.9 * 0.15,
    backgroundColor: '#F8B433',
  },
  DEL: {
    width: width * 0.9 * 0.15,
    backgroundColor: '#A7A5A8',
  },
  DONE: {
    width: width * 0.9 * 0.2,
    backgroundColor: '#5489EA',
  },
  todoButtonText: {
    fontWeight: '900',
    color: 'white',
  },
  todoListContainer: {},
});
