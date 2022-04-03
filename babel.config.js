module.exports = (api) => {
	// Добавляем плагин только для тестового окружения
	if (api.env('test')) {
		config.plugins.push([
			'effector/babel-plugin',
		]);
	}

	return config;
};
