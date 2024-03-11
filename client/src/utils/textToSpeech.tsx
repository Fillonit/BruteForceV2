import React, { useState, useEffect, ChangeEvent } from "react";

interface TextToSpeechProps {
	text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
		null
	);
	const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
	const [pitch, setPitch] = useState<number>(1);
	const [rate, setRate] = useState<number>(1);
	const [volume, setVolume] = useState<number>(1);

	useEffect(() => {
		const synth = window.speechSynthesis;
		const u = new SpeechSynthesisUtterance(text);
		const voices = synth.getVoices();

		setUtterance(u);
		setVoice(voices[0]);

		return () => {
			synth.cancel();
		};
	}, [text]);

	useEffect(() => {
		const synth = window.speechSynthesis;
		const setVoices = () => {
			const voices = synth.getVoices();
			setVoice(voices[0]);
		};

		setVoices();
		synth.onvoiceschanged = setVoices;

		return () => {
			synth.onvoiceschanged = null;
		};
	}, []);

	const handlePlay = () => {
		const synth = window.speechSynthesis;

		if (isPaused && utterance) {
			synth.resume();
		} else if (utterance && voice) {
			utterance.voice = voice;
			utterance.pitch = pitch;
			utterance.rate = rate;
			utterance.volume = volume;
			synth.speak(utterance);
		}

		setIsPaused(false);
	};

	const handlePause = () => {
		const synth = window.speechSynthesis;

		synth.pause();

		setIsPaused(true);
	};

	const handleStop = () => {
		const synth = window.speechSynthesis;

		synth.cancel();

		setIsPaused(false);
	};

	const handleVoiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const voices = window.speechSynthesis.getVoices();
		setVoice(voices.find((v) => v.name === event.target.value) || null);
	};

	const handlePitchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPitch(parseFloat(event.target.value));
	};

	const handleRateChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRate(parseFloat(event.target.value));
	};

	const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setVolume(parseFloat(event.target.value));
	};

	return (
		<div className="flex flex-col space-y-4 dark:text-white text-black mb-2 items-center justify-center">
			<div className="flex items-center space-x-2">
				<span>Voice:</span>
				<select
					className="rounded dark:bg-slate-900 bg-white accent-purple-500 w-full"
					value={voice?.name}
					onChange={handleVoiceChange}
				>
					{window.speechSynthesis.getVoices().map((voice) => (
						<option key={voice.name} value={voice.name}>
							{voice.name}
						</option>
					))}
				</select>
			</div>

			<div className="flex items-center space-x-2">
				<span>Pitch:</span>
				<input
					className="rounded accent-purple-500"
					type="range"
					min="0.5"
					max="2"
					step="0.1"
					value={pitch}
					onChange={handlePitchChange}
				/>
				<span>Speed:</span>
				<input
					className="rounded accent-purple-500"
					type="range"
					min="0.5"
					max="2"
					step="0.1"
					value={rate}
					onChange={handleRateChange}
				/>
				<span>Volume:</span>
				<input
					className="rounded accent-purple-500"
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={volume}
					onChange={handleVolumeChange}
				/>
			</div>

			<div className="flex space-x-2">
				<button
					className="rounded p-2 bg-purple-500 text-white dark:bg-purple-600"
					onClick={handlePlay}
				>
					{isPaused ? "Resume" : "Play"}
				</button>
				<button
					className="rounded p-2 bg-purple-500 text-white dark:bg-purple-600"
					onClick={handlePause}
				>
					Pause
				</button>
				<button
					className="rounded p-2 bg-purple-500 text-white dark:bg-purple-600"
					onClick={handleStop}
				>
					Stop
				</button>
			</div>
		</div>
	);
};

export default TextToSpeech;
