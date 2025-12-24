
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "연차나우 (LeaveNow)";
    const defaultDescription = "2026년 대한민국 공휴일, 대체공휴일 정보를 완벽 분석하여 최적의 연차 사용법을 제안합니다.";
    const defaultKeywords = "2026년 공휴일, 2026년 황금연휴, 직장인 연차, 연차 계산기";
    const defaultImage = "https://lleave-now.web.app/og-image.svg";
    const siteUrl = "https://lleave-now.web.app";

    const finalTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - 2026년 황금연휴 마스터 플랜`;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />
        </Helmet>
    );
};

export default SEO;
