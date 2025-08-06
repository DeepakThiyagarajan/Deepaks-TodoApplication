import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Check, Clock, Trash2, CreditCard as Edit3 } from 'lucide-react-native';
import { useTasks, Task } from '@/context/TaskContext';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(task.id) },
      ]
    );
  };

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'open';
  const isCompleted = task.status === 'complete';

  return (
    <View style={[
      styles.container,
      isCompleted && styles.completedContainer,
      isOverdue && styles.overdueContainer
    ]}>
      <TouchableOpacity
        style={styles.content}
        onPress={handleToggleStatus}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={[
              styles.checkbox,
              isCompleted && styles.checkboxCompleted
            ]}>
              {isCompleted && <Check size={16} color="#FFFFFF" />}
            </View>
            <Text style={[
              styles.title,
              isCompleted && styles.completedTitle
            ]}>
              {task.title}
            </Text>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit3 size={16} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleDelete}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        {task.description && (
          <Text style={[
            styles.description,
            isCompleted && styles.completedDescription
          ]}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.dueDateContainer}>
            <Clock size={14} color={isOverdue ? '#EF4444' : '#6B7280'} />
            <Text style={[
              styles.dueDate,
              isOverdue && styles.overdueDueDate
            ]}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </Text>
          </View>
          
          <View style={[
            styles.statusBadge,
            isCompleted ? styles.completedBadge : styles.openBadge
          ]}>
            <Text style={[
              styles.statusText,
              isCompleted ? styles.completedStatusText : styles.openStatusText
            ]}>
              {isCompleted ? 'Completed' : 'Open'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.7,
  },
  overdueContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  completedDescription: {
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  overdueDueDate: {
    color: '#EF4444',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: '#FEF3C7',
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  openStatusText: {
    color: '#D97706',
  },
  completedStatusText: {
    color: '#065F46',
  },
});