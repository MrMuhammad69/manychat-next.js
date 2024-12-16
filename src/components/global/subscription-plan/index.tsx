import { useQueryUser } from "@/hooks/use-query-automation";

type Props = {
    children: React.ReactNode;
    type: 'FREE' | 'PRO';
};

export default function SubscriptionPlan({ children, type }: Props) {
    const {data} = useQueryUser()
    return data?.data?.subscription?.plan === type && children
}
