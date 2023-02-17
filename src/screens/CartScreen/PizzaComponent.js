import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets';
import { Colors } from '../../constants/colors';
import { AppMargin } from '../../constants/commonStyle';

class PizzaComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const { navigation, data, onItemPress } = this.props;
		return (
			<TouchableOpacity onPress={onItemPress} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', }}>
				<Image style={{ height: 120, width: 120, }} source={data.icon} />
				<View style={{ left: AppMargin._20, width: '80%' }}>
					<Text style={{ color: Colors.primary, fontFamily: Fonts.BOLD }}>{data.name}</Text>
					<Text style={{ color: Colors.primary, fontFamily: Fonts.REGULAR }}>{data.type}</Text>
					<Text style={{ color: Colors.primary, fontFamily: Fonts.BOLD }}>${data.price}.00</Text>
				</View>
			</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({
});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(PizzaComponent);
