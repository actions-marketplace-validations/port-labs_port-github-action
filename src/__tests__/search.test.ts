import * as core from '@actions/core';

import main from '../main';
import { TestInputs, clearInputs, getBaseInput, setInputs } from './utils/utils';

describe('Search Integration Tests', () => {
	let outputMock: jest.SpyInstance;
	let failedMock: jest.SpyInstance;
	let input: TestInputs = {};

	beforeAll(() => {
		outputMock = jest.spyOn(core, 'setOutput');
		failedMock = jest.spyOn(core, 'setFailed');
	});

	beforeEach(() => {
		jest.clearAllMocks();
		clearInputs(input);
		input = {};
	});

	test('Should get entities successfully', async () => {
		input = {
			...getBaseInput(),
			...{
				operation: 'SEARCH',
				query:
					'{ "rules": [{ "operator": "=", "value": "e_nrw9dSY4yAYl9A8U", "property": "$identifier"}], "combinator": "and" }',
			},
		};

		setInputs(input);

		await main();

		expect(outputMock).toBeGreaterThan(0);
		expect(failedMock).toHaveBeenCalledTimes(0);
	});

	test('Should fail get input - missing required param query', async () => {
		input = {
			...getBaseInput(),
			...{
				operation: 'SEARCH',
			},
		};

		setInputs(input);

		await main();

		expect(outputMock).toHaveBeenCalledTimes(0);
		expect(failedMock).toHaveBeenCalledWith('SEARCH Operation - query is missing from input');
	});
});
