import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fonts, FontSize } from '../../assets';
import { Colors } from '../../constants/colors';

class Selection extends React.Component {
	render() {
		const { data, selectedIndex, index, onItemPress } = this.props;
		return (
			<TouchableOpacity onPress={onItemPress} style={styles.touchableView}>
				<Text style={[styles.itemText, { fontFamily: selectedIndex === index ? Fonts.BOLD : Fonts.REGULAR, fontSize: selectedIndex === index ? FontSize._18 : FontSize._16 }]}>{data.types}</Text>
			</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({
	touchableView: { paddingHorizontal: 12, justifyContent: 'center' },
	itemText: { color: Colors.primary, fontSize: FontSize._18 }
});

export default Selection