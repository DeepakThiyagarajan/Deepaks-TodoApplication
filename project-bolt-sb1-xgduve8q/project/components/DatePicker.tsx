import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface DatePickerProps {
  visible: boolean;
  date: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

export default function DatePicker({ visible, date, onDateChange, onClose }: DatePickerProps) {
  const handleDateSelect = (selectedDate: Date) => {
    onDateChange(selectedDate);
    onClose();
  };

  // Generate next 30 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Due Date</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.dateGrid}>
          {dates.map((dateOption, index) => {
            const isSelected = dateOption.toDateString() === date.toDateString();
            const isToday = dateOption.toDateString() === new Date().toDateString();
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  isSelected && styles.selectedDateItem,
                  isToday && styles.todayDateItem
                ]}
                onPress={() => handleDateSelect(dateOption)}
              >
                <Text style={[
                  styles.dayText,
                  isSelected && styles.selectedText,
                  isToday && styles.todayText
                ]}>
                  {dateOption.toLocaleDateString('en', { weekday: 'short' })}
                </Text>
                <Text style={[
                  styles.dateText,
                  isSelected && styles.selectedText,
                  isToday && styles.todayText
                ]}>
                  {dateOption.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  placeholder: {
    width: 60,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 24,
    gap: 12,
  },
  dateItem: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedDateItem: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  todayDateItem: {
    borderColor: '#10B981',
    borderWidth: 2,
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  todayText: {
    color: '#10B981',
  },
});