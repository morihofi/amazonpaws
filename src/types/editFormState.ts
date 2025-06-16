import {PawPrint} from "@/types/pawPrint";

export type EditFormState = {
    pawPrint?: PawPrint;
    preSignedUrl?: string;
    error?: string;
    ok?: boolean;
}