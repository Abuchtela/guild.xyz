import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import { useFormState } from "react-hook-form"
import parseFromObject from "utils/parseFromObject"
import ControlledNumberInput from "./ControlledNumberInput"

type Props = {
  baseFieldPath: string
  fieldName: string
  isRequired?: boolean
  formLabel: string
  formHelperText?: string
}

const BlockNumberFormField = ({
  baseFieldPath,
  fieldName,
  isRequired,
  formLabel,
  formHelperText,
}: Props): JSX.Element => {
  const { errors } = useFormState()

  return (
    <FormControl
      w="full"
      isRequired={isRequired}
      isInvalid={!!parseFromObject(errors, baseFieldPath)?.data?.[fieldName]}
    >
      <FormLabel>{formLabel}</FormLabel>

      <ControlledNumberInput
        placeholder="Filled out automatically"
        name={`${baseFieldPath}.data.${fieldName}`}
        isRequired={isRequired}
        isDisabled
      />

      <FormErrorMessage>
        {parseFromObject(errors, baseFieldPath)?.data?.[fieldName]?.message}
      </FormErrorMessage>

      {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
    </FormControl>
  )
}

export default BlockNumberFormField