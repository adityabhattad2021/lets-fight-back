import "./candidateRegister.style.scss";
import logo from "./logo192.png";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import LinksAndResume from "./steps/LandR";
import EducationalDetails from "./steps/EducationalDetails";
import PersonalDetails from "./steps/PersonalDetails";
import useMediaQuery from '@mui/material/useMediaQuery';

const steps = ["Personal Details", "Education Details", "Links and Resume"];

export default function CandidateRegistration() {
    const smallScreen = useMediaQuery('(min-width:900px)');
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

	const isStepOptional = (step) => {
		return false;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleSteps = (step) => {
		switch (step) {
			case 0:
				return <PersonalDetails />;
			case 1:
				return <EducationalDetails />;
			case 2:
				return <LinksAndResume />;
			default:
				throw new Error("Unknown step");
		}
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	return (
		<div className="register">
			<div className="register__container">
				<div className="register__titleholder">
					<img className="register__logo" src={logo} />
					<h1 className="register__title">Candidate Registration</h1>
				</div>
				<div className="register__form">
					<Stepper
						activeStep={activeStep}
						alternativeLabel
						sx={{ width: "100%",mt:"-10px"}}
					>
						{steps.map((label, index) => {
							return (
								<Step key={label}>
									<StepLabel>
										<Typography
											fontSize={smallScreen ? 32 : 18}
											fontWeight="700"
										>
											{label}
										</Typography>
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</div>
				{handleSteps(activeStep)}
				<div className="register__formControl">
					<Button
						variant="contained"
						size="large"
						sx={{
							width: 200,
							fontSize: "22px",
							borderRadius: "9.3987px",
						}}
						onClick={handleBack}
					>
						Prev
					</Button>
					<Button
						variant="contained"
						color="success"
						size="large"
						sx={{
							width: 200,
							fontSize: "22px",
							borderRadius: "9.3987px",
						}}
						onClick={handleNext}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
