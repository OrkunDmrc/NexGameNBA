import { colors } from '@/app/utils';
import { DateContext } from '@/contexts/DateContext';
import React, { useContext } from 'react';
import {
    Dimensions,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 5;
const VISIBLE_CARDS = 5;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 2 * VISIBLE_CARDS) / VISIBLE_CARDS;

const formatDay = (date: Date): string =>
  date.toLocaleDateString('en-US', { weekday: 'short' });

const formatDate = (date: Date): number => date.getDate();

const formatMonth = (date: Date): string =>
  date.toLocaleDateString('en-US', { month: 'short' });

const generateNextNDates = (n: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};

const DateCardSlider: React.FC = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('DateDisplay must be used within a DateProvider');
    }
    const { selectedDate, setSelectedDate } = context;
    const dates: Date[] = generateNextNDates(30);

    const renderItem = ({ item }: ListRenderItemInfo<Date>) => {
    const itemString = item.toDateString();
    const isSelected = selectedDate === itemString;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedDate(itemString)}
      >
        <Text style={[styles.day, isSelected && styles.selectedDay]}>{formatDay(item)}</Text>
        <Text style={[styles.date, isSelected && styles.selectedDate]}>{formatDate(item)}</Text>
        <Text style={[styles.month, isSelected && styles.selectedMonth]}>{formatMonth(item)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{height: 100}}>
      <FlatList
        horizontal
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.toDateString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: 100,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: CARD_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: colors.secondaryColor,
  },
  day: {
    color: colors.secondaryColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedDay: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    color: colors.secondaryColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  selectedDate: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  month: {
    color: colors.secondaryColor,
    fontSize: 14,
  },
  selectedMonth: {
    color: colors.white,
    fontSize: 14,
  },
});

export default DateCardSlider;
