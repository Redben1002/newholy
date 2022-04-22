import { Component } from 'react';
import { gamesAPI, set_page } from '../../root.js';
import { Item, GamesAPI } from '../../GamesUtil.js';
import Settings from '../../Settings.js';
import '../../styles/Games Category.scss';

export default class Category extends Component {
	state = {
		data: [],
	};
	api = new GamesAPI(gamesAPI);
	settings = new Settings(`games category ${this.props.id} settings`, {
		sort: 'Most Played',
	});
	abort = new AbortController();
	async fetch() {
		let leastGreatest = false;
		let sort;

		switch (this.settings.get('sort')) {
			case 'Least Played':
				leastGreatest = true;
			// falls through
			case 'Most Played':
				sort = 'plays';
				break;
			case 'Least Favorites':
				leastGreatest = true;
			// falls through
			case 'Most Favorites':
				sort = 'favorites';
				break;
			case 'Name (Z-A)':
				leastGreatest = true;
			// falls through
			case 'Name (A-Z)':
				sort = 'name';
				break;
			default:
				console.warn('Unknown sort', this.settings.get('sort'));
				break;
		}

		try {
			const data = await this.api.category(this.props.id, sort, leastGreatest);

			return this.setState({
				data,
			});
		} catch (error) {
			return this.setState({
				error,
			});
		}
	}
	componentDidMount() {
		this.fetch();
	}
	componentWillUnmount() {
		this.abort.abort();
	}
	render() {
		set_page('games-category');

		const items = [];

		for (let item of this.state.data) {
			items.push(
				<Item
					key={item.id}
					id={item.id}
					layout={this.props.layout}
					name={item.name}
				/>
			);
		}

		return (
			<main>
				<h1>{this.props.name}</h1>
				<div className="sort">
					<select
						defaultValue={this.settings.get('sort')}
						onChange={async event => {
							this.settings.set('sort', event.target.value);
							await this.fetch();
						}}
					>
						<option value="Most Played">Most Played</option>
						<option value="Least Played">Least Played</option>
						<option value="Name (A-Z)">Name (A-Z)</option>
						<option value="Name (Z-A)">Name (Z-A)</option>
					</select>
				</div>
				<div className="items">{items}</div>
			</main>
		);
	}
}