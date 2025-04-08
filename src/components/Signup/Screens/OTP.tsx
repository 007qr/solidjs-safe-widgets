import { SignUpModalFlow } from "../../../utils/types";
import OTPInputComponent from "../../OTPInputComponent";
// import { useStytch } from "@stytch/nextjs";
import { Accessor, createSignal, Setter } from "solid-js";

export default function OTP({
    methodId,
    setFlow,
}: {
    methodId: Accessor<string>;
    setFlow: Setter<SignUpModalFlow>;
}) {
    // const stytchClient = useStytch();
    const [otp, setOTP] = createSignal<string>("");
    const [error, setError] = createSignal<boolean>(false);

    const handleChange = (otp: string) => {
        setOTP(otp);
        if (otp.length === 6) {
            // const res = stytchClient.otps.authenticate(otp, methodId, {
            //     session_duration_minutes: 60,
            // });
            console.log(otp);
            setFlow("step3");
            // res.then((val) => {
            //     setFlow("joined");
            // }).catch((err) => setError(true));
        }
    };

    return (
        <div class="flex flex-col h-full w-full mt-[16px]">
            <div>
                <h3 class="text-[31px] font-semibold tracking-tighter leading-[150%]">
                    Check you email
                </h3>
                <p class="text-black/60 text-sm leading-[150%]">
                    Enter the 6 digit code we have emailed you
                </p>
            </div>
            <div class="mt-[32px]">
                <OTPInputComponent
                    error={error()}
                    autoFocus
                    isNumberInput
                    length={6}
                    onChangeOTP={handleChange}
                />
            </div>
        </div>
    );
}