import { Link } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUpPage = () => {
	return (
		<div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<img className='mx-auto h-36 w-auto' src='/logo.png' alt='9JAWORKS' />
				<h2 className='text-center text-3xl font-extrabold text-gray-900'>
					Make the most of your professional life
				</h2>
			</div>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-[0_4px_10px_rgba(0,156,34,0.3)]'>
				<div className='bg-white py-8 px-4 shadow-[0_4px_10px_rgba(0,156,34,0.3)] sm:rounded-lg sm:px-10'>
					<SignUpForm />

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-black-500'>Already on 9JAWORKS?</span>
							</div>
						</div>
						<div className='mt-6'>
							<Link
								to='/login'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50'
							>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;