type Props = {
    children: React.ReactNode;
    type: 'FREE' | 'PRO';
};

export default function SubscriptionPlan({ children, type }: Props) {
    return (
        <div >
            {children}
        </div>
    );
}
