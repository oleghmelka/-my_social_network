import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getIsFetching, getSomethingDifficult } from '../../redux/users-selectors';


class UsersContainer extends React.Component {

    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(pageNumber, pageSize);
    }
    
    render () {

        return <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                        users={this.props.users}
                        pageSize={this.props.pageSize}
                        onPageChanged={this.onPageChanged}
                        currentPage={this.props.currentPage}
                        unfollow={this.props.unfollow}
                        follow={this.props.follow}
                        followingInProgress={this.props.followingInProgress}
                        
                />
              </>
    }
}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        //somethingDifficult: getSomethingDifficult(state),   "How to call the selector that was created using Reselect Library"
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose (
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers} )
) (UsersContainer);



