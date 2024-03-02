import AssetsTable from '@/components/AssetsTable'
import PointsLeaderboard from '@/components/PointsLeaderboard'
import ReferralList from '@/components/ReferralList'
import { Button, Tab, Tabs } from '@nextui-org/react'
import styled from 'styled-components'
import abi from '@/abi/abi.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
const BridgeBox = styled.div`
    .left {
        min-width: 460px;
        width: 460px;
    }
    .right {
        min-width: 460px;
        width: calc(100% - 460px);
    }
`
const CardBox = styled.div`
    background-color: #1a1a1a;
    .main-value {
        color: #69ccb0;
    }
    .second-value {
        color: #c2fff4;
    }
    .desc-text {
        color: #7e7e7e;
    }
`

const ProgressBar = styled.div`
    width: 442px;
    background-color: #2a2a2a;
    overflow: hidden;
    .bar-inner {
        max-width: 100%;
        height: 100%;
        background-color: #0bc48f;
    }
`

export default function Bridge() {
    const [contract, setContract] = useState<any>(null);
    async function initContract() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractInstance = new ethers.Contract('CONTRACT_ADDRESS', abi, signer);
        
        setContract(contractInstance);
    }

    useEffect(() => {

        initContract();
    }, []);

    // 使用合约
    useEffect(() => {
        if (contract) {
            getL2TransactionBaseCost();
        }
    }, [contract]);

    async function getL2TransactionBaseCost() {
        const gasPrice = ''; // 前端填入 gasPrice
        const l2GasLimit = ''; // 前端填入 l2GasLimit
        const l2GasPerPubdataByteLimit = '' // 前端l2GasPerPubdataByteLimit

        const baseCost = await contract.l2TransactionBaseCost(gasPrice, l2GasLimit, l2GasPerPubdataByteLimit);
        /**
         *  address _contractL2,
        uint256 _l2Value,
        bytes calldata _calldata,
        uint256 _l2GasLimit,
        uint256 _l2GasPerPubdataByteLimit,
        bytes[] calldata _factoryDeps,
        address _refundRecipient
         */
        // const result2 = await contract.requestL2Transaction('_contractL2', '_l2Value', '_calldata', '_l2GasLimit', '_l2GasPerPubdataByteLimit', '_factoryDeps', '_refundRecipient');
        console.log('The base cost is: ', baseCost.toString());
    }
    return (
        <>
            <BridgeBox className='flex py-8'>
                <div className='left pl-16 pr-6'>
                    <CardBox className='px-4 py-6 rounded-xl text-center'>
                        <div className='main-value text-3xl'>123,456,789</div>
                        <div className='desc-text mt-4 text-sm'>zkLink Points</div>
                    </CardBox>
                    <CardBox className='mt-6 p-8 rounded-xl text-center'>
                        <div>
                            <div className='second-value text-xl'>123,456</div>
                            <div className='desc-text mt-4 text-sm'>Earn By Your Deposit</div>
                        </div>
                        <div className='mt-6'>
                            <div className='second-value text-xl'>123,456</div>
                            <div className='desc-text mt-4 text-sm'>Earn By Referring Friends</div>
                        </div>
                    </CardBox>
                    <CardBox className='mt-6 p-8 rounded-xl text-center'>
                        <div>
                            <div className='second-value text-xl'>$123,456,789</div>
                            <div className='desc-text mt-4 text-sm'>Your Staking Value</div>
                        </div>
                        <Button
                            color='success'
                            className='mt-4 w-full'
                            size='lg'>
                            Bridge More
                        </Button>
                    </CardBox>
                    <CardBox className='mt-6 p-8 rounded-xl text-center'>
                        <div className='text-white text-2xl'>#20444</div>
                        <div className='desc-text mt-4 text-sm'>Your Rank</div>
                    </CardBox>
                </div>
                <div className='right pr-16'>
                    <div>
                        <div className='flex justify-between'>
                            <span className='text-2xl'>Invites</span>
                            <div>
                                <p className='text-base mb-2 text-right'>$6000 of $10,000 for 2x Boost</p>
                                <ProgressBar className='h-3 rounded-full'>
                                    <div className='bar-inner w-1/5'></div>
                                </ProgressBar>
                            </div>
                        </div>

                        <div className='flex justify-between gap-6 mt-6 text-center'>
                            <CardBox className='flex justify-around items-center w-1/2 rounded-xl'>
                                <div>
                                    <div className='text-xl'>$200,000</div>
                                    <div className='desc-text text-sm mt-4'>Despoit by Group</div>
                                </div>
                                <div>
                                    <div className='text-xl'>2x</div>
                                    <div className='desc-text text-sm mt-4'>Group Points Boost</div>
                                </div>
                            </CardBox>
                            <CardBox className='flex flex-col items-center justify-center py-8 w-1/2 rounded-xl'>
                                <div className='text-xl'>100</div>
                                <div className='desc-text text-sm mt-4'>Number of Referrals</div>
                            </CardBox>
                        </div>

                        <CardBox className='flex justify-between items-center mt-6 p-8 rounded-xl'>
                            <div>
                                <span>Your Invite Code</span>
                                <span>https://zk.link/0x13214...4321</span>
                            </div>

                            <Button className='bg-slate-300 text-black'>Copy invite</Button>
                        </CardBox>
                    </div>
                    <div>
                        <Tabs
                            variant='underlined'
                            className='mt-6'>
                            <Tab
                                title='Supported Assets'
                                className='text-xl'>
                                <AssetsTable />
                            </Tab>
                            <Tab
                                title='Leaderboard'
                                className='text-xl'>
                                <PointsLeaderboard />
                            </Tab>

                            <Tab
                                title='Your Referral'
                                className='text-xl'>
                                <CardBox className='rounded-xl px-6 pb-6'>
                                    <ReferralList />
                                </CardBox>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </BridgeBox>
        </>
    )
}
