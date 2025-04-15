import {Grid, GridItem} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {remindAdDefaultValues} from "@src/@types/problemList";
import FormSelect from "@src/common/Form/Select";
import {useMasterData} from "@src/hooks/master-data";
import SectionLayout from "@src/layout/SectionLayout";
import {remindAsSchema} from "@src/schema/problemList";
import {FormProvider, useForm} from "react-hook-form";

const RemindAsAddModal = () => {
  const methods = useForm({
    defaultValues: remindAdDefaultValues,
    resolver: zodResolver(remindAsSchema),
  });

  const {control, handleSubmit} = methods;
  const submit = () => {};
  const {referralCategory} = useMasterData();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <SectionLayout
          hasHeader={false}
          contentBg="primary.100"
          borderColor="border.main"
          margin={2}
        >
          <Grid templateColumns="repeat(2,1fr)" p={4} gap={4}>
            <GridItem>
              <FormSelect
                name="remindas"
                options={referralCategory}
                control={control}
                label="Remind As"
              />
            </GridItem>
            <GridItem>
              <FormSelect control={control} name="remindas" options={referralCategory} />
            </GridItem>
          </Grid>
        </SectionLayout>
      </form>
    </FormProvider>
  );
};
export default RemindAsAddModal;
