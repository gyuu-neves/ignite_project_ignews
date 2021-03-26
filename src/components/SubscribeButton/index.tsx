import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import { getStripeJs } from '../../services/stripe-js'
import router, { useRouter } from 'next/router';
import { Session } from 'next-auth';

interface SubscribeButtonProps {
    priceID: string;
}

interface UserSubscriptionSession extends Session {
    activeSubscription?: any;
  }
  
  type SessionProps = [UserSubscriptionSession, boolean]

export default function SubsribeButton({ priceID }:SubscribeButtonProps) {
    const [session]: SessionProps = useSession()

    const router = useRouter()

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        if (session?.activeSubscription) {
            router.push("/posts")
            return
        }

    }

    return (
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
        Subscribe Now         
        </button>
    )
}
