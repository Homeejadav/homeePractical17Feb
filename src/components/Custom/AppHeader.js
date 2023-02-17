import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import { AppText } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppMargin } from '../../constants/commonStyle';

class AppHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}


	render() {
		const { label, onIconPress } = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={onIconPress} style={styles.container} >
					<Image style={{ tintColor: Colors.primary }} source={Icons.icnBack} />
					<AppText left={AppMargin._10} label={label} />
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});


export default AppHeader;
